import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const { width } = Dimensions.get('window');

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isDetecting, setIsDetecting] = useState(false);
  const [helmetStatus, setHelmetStatus] = useState('Press Start to Begin');
  const [facing, setFacing] = useState('back');
  const [confidence, setConfidence] = useState(0);
  const [detectionCount, setDetectionCount] = useState(0);
  const cameraRef = useRef(null);
  const detectionInterval = useRef(null);

  useEffect(() => {
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);

  const analyzeImage = async (imageUri) => {
    try {
      const imageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // TODO: API of Open CV that I will make 
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const random = Math.random();
      const hasHelmet = random > 0.4;
      const confidenceLevel = Math.floor(random * 25) + 75;
      
      return { hasHelmet, confidence: confidenceLevel };
    } catch (error) {
      console.error('Error analyzing image:', error);
      return null;
    }
  };

  const captureAndAnalyze = async () => {
    if (!cameraRef.current || !isDetecting) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: false,
        skipProcessing: true,
      });

      const result = await analyzeImage(photo.uri);

      if (result) {
        setConfidence(result.confidence);
        setDetectionCount(prev => prev + 1);
        
        if (result.hasHelmet) {
          setHelmetStatus('Helmet Detected');
        } else {
          setHelmetStatus('No Helmet - Please Wear One!');
        }
      }

      await FileSystem.deleteAsync(photo.uri, { idempotent: true });
    } catch (error) {
      console.error('Error capturing image:', error);
      setHelmetStatus('Detection Error - Retrying...');
    }
  };

  const toggleDetection = () => {
    if (!isDetecting) {
      setIsDetecting(true);
      setHelmetStatus('Scanning...');
      setDetectionCount(0);
      
      captureAndAnalyze();
      
      detectionInterval.current = setInterval(() => {
        captureAndAnalyze();
      }, 1500);
    } else {
      setIsDetecting(false);
      setHelmetStatus('Detection Stopped');
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
        detectionInterval.current = null;
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text style={styles.loadingText}>Initializing Camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera permission to detect helmets and ensure safety compliance
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Access</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getStatusColor = () => {
    if (helmetStatus.includes('Detected') && !helmetStatus.includes('No')) return '#00FF94';
    if (helmetStatus.includes('No Helmet')) return '#FF3B5C';
    return '#00D9FF';
  };

  const getStatusIcon = () => {
    if (helmetStatus.includes('Detected') && !helmetStatus.includes('No')) return '✓';
    if (helmetStatus.includes('No Helmet')) return '✕';
    return '◉';
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.overlay}>
          {/* Top Status Bar */}
          <View style={styles.topSection}>
            <View style={styles.brandHeader}>
              <Text style={styles.brandText}>HELMET DETECTOR</Text>
              {isDetecting && (
                <View style={styles.liveIndicator}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              )}
            </View>

            {/* Detection Frame */}
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {isDetecting && (
                <View style={styles.scanLine} />
              )}
            </View>

            {/* Status Display */}
            <View style={[styles.statusCard, { borderLeftColor: getStatusColor() }]}>
              <View style={styles.statusRow}>
                <View style={[styles.statusIconContainer, { backgroundColor: getStatusColor() }]}>
                  <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
                </View>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusLabel}>Status</Text>
                  <Text style={[styles.statusValue, { color: getStatusColor() }]}>
                    {helmetStatus}
                  </Text>
                </View>
              </View>
              
              {confidence > 0 && (
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Confidence</Text>
                    <Text style={styles.statValue}>{confidence}%</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Scans</Text>
                    <Text style={styles.statValue}>{detectionCount}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomSection}>
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={toggleCameraFacing}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryButtonIcon}>⟲</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryButton, isDetecting && styles.primaryButtonActive]}
                onPress={toggleDetection}
                activeOpacity={0.8}
              >
                <View style={styles.primaryButtonInner}>
                  {isDetecting ? (
                    <>
                      <View style={styles.stopIcon} />
                      <Text style={styles.primaryButtonText}>STOP</Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.playIcon} />
                      <Text style={styles.primaryButtonText}>START</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => !isDetecting && captureAndAnalyze()}
                disabled={isDetecting}
                activeOpacity={0.7}
              >
                <Text style={[styles.secondaryButtonIcon, isDetecting && styles.disabledIcon]}>
                  ◉
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B5C',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B5C',
    marginRight: 6,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF3B5C',
    letterSpacing: 1,
  },
  scanArea: {
    alignSelf: 'center',
    width: width * 0.7,
    height: width * 0.8,
    marginBottom: 25,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00D9FF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#00D9FF',
    top: '50%',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  statusCard: {
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    backdropFilter: 'blur(10px)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statusIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 15,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonIcon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
  },
  disabledIcon: {
    opacity: 0.3,
  },
  primaryButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00D9FF',
  },
  primaryButtonActive: {
    backgroundColor: 'rgba(255, 59, 92, 0.2)',
    borderColor: '#FF3B5C',
  },
  primaryButtonInner: {
    width: 115,
    height: 115,
    borderRadius: 57.5,
    backgroundColor: '#00D9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: '#000',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 5,
    marginBottom: 8,
  },
  stopIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 3,
    marginBottom: 8,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 2,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00D9FF',
    fontSize: 16,
    marginTop: 15,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  permissionCard: {
    backgroundColor: 'rgba(20, 20, 30, 0.95)',
    borderRadius: 24,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 15,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#00D9FF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
  },
  permissionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
});