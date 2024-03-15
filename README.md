# Virtual Meet

Virtual Meet👥💼 is an open-source web application developed by [AJTimePyro](https://github.com/AJTimePyro) that allows users to host virtual meetings, similar to platforms like Google Meet or Zoom. This project utilizes modern technologies like Next.js 14, Tailwind CSS, PeerJS, and PusherJS to provide a seamless and feature-rich virtual meeting experience.

## Features

- **Real-time Video Calls**🎥: Utilizing PeerJS and WebRTC technology, Virtual Meet enables real-time video calls with low latency and high-quality audio/video streaming.
  
- **Responsive Design**💻: The application is designed with responsiveness in mind, allowing users to join meetings from various devices and screen sizes.

## Tech Stack

- **Next.js 14**: A React framework for building server-side rendered and static web applications, providing fast performance and developer-friendly features.
  
- **Tailwind CSS**: A utility-first CSS framework that makes styling and customization efficient and maintainable.
  
- **PeerJS**: A JavaScript library that simplifies WebRTC implementation for peer-to-peer communication, enabling real-time audio/video calls.
  
- **PusherJS**: A real-time communication service that facilitates WebSocket-based communication, ensuring seamless real-time updates and interactions.

## Getting Started

To get started with Virtual Meet locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/AJTimePyro/VirtualMeet.git
   ```
2. Install dependencies:

   ```
   cd VirtualMeet
   npm install
   ```
3. Configure environment variables:
   Create a .env file in the root directory and add the following variables:
   
   ```
   NEXT_PUSHER_APP_ID=your_pusher_app_id
   NEXT_PUBLIC_PUSHER_KEY=your_pusher_app_key
   NEXT_PUSHER_SECRET=your_pusher_app_secret
   NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_app_cluster
   ```

4. Start the server:
   
   For Developement:
   
   ```
   npm run dev
   ```

   For production build:

   ```
   npm run build
   npm run start
   ```
   
6. Yeah it's now running 🥳

## Contributing
Contributions are welcome! If you'd like to contribute to Virtual Meet, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the [MIT License](https://github.com/AJTimePyro/VirtualMeet/blob/main/LICENSE).
