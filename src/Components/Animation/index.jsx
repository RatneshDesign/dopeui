// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import "./index.css";

// export default function AudioVisualizer({ mode = "wave", audioFile = './ring.mp3' }) {
//   const [audioCtx, setAudioCtx] = useState(null);
//   const [analyser, setAnalyser] = useState(null);
//   const [dataArray, setDataArray] = useState(new Uint8Array(128));
//   const [isMic, setIsMic] = useState(false);
//   const rafId = useRef(null);

//   // Setup analyser for audio file
//   useEffect(() => {
//     if (!audioFile) return;
//     const ctx = new (window.AudioContext || window.webkitAudioContext)();
//     const analyserNode = ctx.createAnalyser();
//     analyserNode.fftSize = 256;

//     const audio = new Audio(audioFile);
//     audio.crossOrigin = "anonymous";
//     const source = ctx.createMediaElementSource(audio);
//     source.connect(analyserNode);
//     analyserNode.connect(ctx.destination);
//     audio.play();

//     const bufferLength = analyserNode.frequencyBinCount;
//     const data = new Uint8Array(bufferLength);
//     setDataArray(data);
//     setAudioCtx(ctx);
//     setAnalyser(analyserNode);

//     return () => {
//       audio.pause();
//       ctx.close();
//     };
//   }, [audioFile]);

//   // Setup analyser for microphone
//   const setupMic = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)();
//       const analyserNode = ctx.createAnalyser();
//       analyserNode.fftSize = 256;

//       const source = ctx.createMediaStreamSource(stream);
//       source.connect(analyserNode);

//       const bufferLength = analyserNode.frequencyBinCount;
//       const data = new Uint8Array(bufferLength);
//       setDataArray(data);
//       setAudioCtx(ctx);
//       setAnalyser(analyserNode);
//       setIsMic(true);
//     } catch (err) {
//       console.error("Microphone permission denied:", err);
//     }
//   };

//   // Animate data updates
//   useEffect(() => {
//     if (!analyser) return;
//     const data = new Uint8Array(analyser.frequencyBinCount);

//     const tick = () => {
//       analyser.getByteFrequencyData(data);
//       setDataArray(new Uint8Array(data));
//       rafId.current = requestAnimationFrame(tick);
//     };

//     tick();
//     return () => cancelAnimationFrame(rafId.current);
//   }, [analyser]);

//   return (
//     <div className="visualizer-container">
//       <div className="controls">
//         <button onClick={setupMic}>Use Microphone</button>
//       </div>

//       {mode === "bars" ? (
//         <div className="bars">
//           {Array.from(dataArray).map((v, i) => (
//             <motion.div
//               key={i}
//               className="bar"
//               animate={{ height: v }}
//               transition={{ duration: 0.2 }}
//             />
//           ))}
//         </div>
//       ) : (
//         <svg className="wave" viewBox="0 0 500 200" preserveAspectRatio="none">
//           <motion.path
//             fill="none"
//             stroke="cyan"
//             strokeWidth="2"
//             animate={{
//               d: [
//                 `M 0 100 ${Array.from(dataArray)
//                   .map((v, i) => `L ${i * 4} ${100 - v / 4}`)
//                   .join(" ")}`,
//               ],
//             }}
//             transition={{ duration: 0.2 }}
//           />
//         </svg>
//       )}
//     </div>
//   );
// }



import { useRef, useState, useEffect } from "react";

export default function AudioVisualizer() {
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", () =>
            setDuration(audio.duration)
        );

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const progressBar = progressRef.current;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        audioRef.current.currentTime = newTime;
        setProgress((newTime / duration) * 100);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
            <audio ref={audioRef} src="/song.mp3" preload="metadata"></audio>

            <button
                onClick={togglePlay}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                }}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Progress Bar */}
            <div
                ref={progressRef}
                onClick={handleSeek}
                style={{
                    position: "relative",
                    height: "8px",
                    background: "#ddd",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #ff4d4d, #4d79ff)",
                        borderRadius: "5px",
                    }}
                ></div>
            </div>

            {/* Time Display */}
            <div style={{ marginTop: "10px", fontSize: "14px" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
        </div>
    );
}
