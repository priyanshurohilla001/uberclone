# 🚖 Full Stack Uber Clone using Ola Maps API

> A full-featured ride-hailing platform built with real-time capabilities, Ola Maps API integration, and seamless user-driver interaction.

---

## 📽 Demo

🎥 [Watch the full demo on Loom](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549)

---

## 🧭 Project Overview

This is a full-stack Uber-style application that simulates a real-world ride-booking experience. Built using WebSockets and the Ola Maps API, the platform enables:

- Real-time location-based ride matching  
- Dynamic pricing and search radius expansion  
- Role-based features for **Users** and **Drivers**  
- Persistent state and live ride tracking  

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js + Express + WebSockets  
- **Database**: MongoDB (or any NoSQL alternative)  
- **Maps API**: Ola Maps API  
- **Authentication**: JWT / Session-based  

---

## 🎯 Core Features

### 1. 🚀 Project Overview  
[🔗 0:00 Video Timestamp](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=0)  
![Overview](https://loom.com/i/12c535732bea4d64b470e203d7cd61f5?workflows_screenshot=true)  
- Built as a full-stack Uber clone  
- Powered by real-time WebSockets and Ola Maps API  

---

### 2. 🖼️ UI Design  
[🔗 0:24](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=24)  
![UI](https://loom.com/i/e45c6a2e8a224ae28a8ea78ef824e04c?workflows_screenshot=true)  
- Separate login/registration for users and drivers  
- Clean dual-panel layout: Users on left, Drivers on right  

---

### 3. 🛺 Ride Creation  
[🔗 0:36](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=36)  
![Ride](https://loom.com/i/5689ba0987384677a6032c2147ae4adc?workflows_screenshot=true)  
- Users can enter pickup and drop locations  
- Location auto-complete powered by Ola Maps  

---

### 4. 💸 Price Calculation  
[🔗 1:00](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=60)  
![Price](https://loom.com/i/2fed6ec4a3944139983838d97cb3572a?workflows_screenshot=true)  
- Ola Maps API calculates dynamic pricing based on input  

---

### 5. 🔍 Ride Search Functionality  
[🔗 1:11](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=71)  
![Search](https://loom.com/i/9a84a8dd65da468abf5830681b53021e?workflows_screenshot=true)  
- Initially searches for drivers within 5 km  
- Expands to 10 km → 15 km with time-based fallback  

---

### 6. 👨‍✈️ Driver Login & Ride Confirmation  
[🔗 1:27](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=87)  
![Driver](https://loom.com/i/a022b1cd36b541ef95eb9d7f52c7ffbc?workflows_screenshot=true)  
- Drivers can log in and share live location  
- Accept incoming ride requests in real time  

---

### 7. 🔄 State Persistence  
[🔗 2:17](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=137)  
![State](https://loom.com/i/24d9dc5607274b4b800c8570c9c5bfa2?workflows_screenshot=true)  
- Preserves user/driver state even after refresh  
- Smooth UX during reconnections  

---

### 8. ❌ Ride Cancellation  
[🔗 2:33](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=153)  
![Cancel](https://loom.com/i/c0ea45bb64c2499f9eb74a7cdfa13c2f?workflows_screenshot=true)  
- Both users and drivers can cancel rides  
- Updates reflected immediately for both parties  

---

### 9. ✅ Ride Completion & Ratings  
[🔗 2:52](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=172)  
![Rating](https://loom.com/i/e1003278fc6a43b98de9e0b1110b07f2?workflows_screenshot=true)  
- Drivers mark rides as completed  
- View and track past rides and ratings  

---

### 10. 🗺️ Map Integration  
[🔗 3:07](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=187)  
![Map](https://loom.com/i/ff287e4e67704074aa48cf57366b225b?workflows_screenshot=true)  
- Ola Maps shows live location and route info  
- Fully integrated with ride flow  

---

### 11. 🧵 Quality Line Integration  
[🔗 3:30](https://www.loom.com/share/2bf10bb99e064d4cbd6c8b404e16c549?t=210)  
![Line](https://loom.com/i/749b7ad5ae974e47bb68a02358b997d6?workflows_screenshot=true)  
- Future plan to add route polylines and advanced map visuals  

---

## 🔮 Future Enhancements

- PWA support for mobile experience  
- Integration with payment gateways  
- Real-time route ETA & driver tracking  
- Emergency button and trip sharing  
- Multi-language support  

---

## 👨‍💻 Author

Built with 💙 by **Priyanshu**

Feel free to connect or fork this repo if you'd like to collaborate or explore the architecture further.

