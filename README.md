# 🏗️ AI-Powered Construction Site Safety Monitor

## 📌 Project Title
AI-Powered Construction Site Safety Monitor

## 👤 Author
Shalini Saloni – 2024-B-27012005A

## 🛠 Problem Statement
Construction sites are high-risk environments where workers are exposed to hazards daily. Safety violations, such as not wearing helmets or vests, often go unnoticed in real time, leading to serious injuries or fatalities. Manual monitoring is inefficient, error-prone, and cannot cover large areas continuously. This project aims to automate safety compliance monitoring using AI, reducing accidents and improving site safety standards.

## 💡 Proposed Solution
An AI-driven system that uses computer vision to analyze live video feeds from CCTV or drone cameras on construction sites. The system will detect workers without required personal protective equipment (PPE), such as helmets and safety vests, and send instant alerts to supervisors. Violations will be logged with image evidence for further review and compliance tracking.

## ✨ Key Features
- Real-time helmet and safety vest detection using AI/ML models  
- Instant alert system via SMS, app notification, or dashboard pop-up  
- Automatic logging of violations with timestamps and images  
- Supervisor dashboard with live camera feed and violation history  
- Zone-based monitoring for restricted area breaches  
- Analytics on safety compliance trends over time  

## 🎯 Target Users
- Construction companies  
- Site supervisors  
- Safety compliance officers  
- Government safety regulators  

## 🖥 Technology Stack
**AI/ML:** YOLOv8, OpenCV, Python  
**Backend:** FastAPI / Node.js  
**Frontend:** React.js Dashboard  
**Database:** PostgreSQL / MongoDB  
**Deployment:** NVIDIA Jetson Nano/Xavier (Edge AI) or AWS/GCP Cloud GPU  
**Notifications:** Twilio API, Firebase Cloud Messaging  

## 📈 Expected Outcome
A functional real-time safety monitoring system capable of detecting PPE violations with over **90% accuracy** and sending alerts within **2 seconds**. The system will help reduce workplace accidents, improve compliance, and maintain automated safety records.

## ⏳ Timeline
| Week | Task |
|------|------|
| 1–2  | Data collection & annotation (PPE dataset preparation) |
| 3–4  | Model training & evaluation |
| 5–6  | Backend & dashboard development |
| 7    | Integration of alert system and database |
| 8    | Testing on live site footage & deployment |

## 📝 Additional Notes
- Requires access to CCTV feeds or recorded site footage for training/testing  
- Initial deployment can focus on helmet detection, with later expansion to other safety violations  
- Reference datasets: Roboflow PPE Detection Dataset, Open Images Dataset  
