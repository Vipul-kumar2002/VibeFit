import React, { useEffect, useRef, useContext, useState } from "react";
import ai from "../assets/AI-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";

function AI() {
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const { showSearch, setShowSearch } = useContext(shopDataContext);

  const [listening, setListening] = useState(false);

  // Speech synthesis helper
  const speak = (message) => {
    const utterance = new window.SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log("Speech Recognition Not Supported");
      speak("Speech Recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      console.log("Speech recognized:", transcript);

      if (transcript.includes("open home")) {
        speak("Opening home page");
        setShowSearch(false);
        navigate("/");
      } else if (transcript.includes("open about")) {
        speak("Opening about page");
        setShowSearch(false);
        navigate("/about");
      } else if (
        transcript.includes("open collection") ||
        transcript.includes("open product") ||
        transcript.includes("open shop")
      ) {
        speak("Opening collection page");
        setShowSearch(false);
        navigate("/collection");
      } else if (transcript.includes("open men")) {
        speak("Opening men section");
        setShowSearch(false);
        navigate("/collection?section=men");
      } else if (transcript.includes("open women")) {
        speak("Opening women section");
        setShowSearch(false);
        navigate("/collection?section=women");
      } else if (transcript.includes("open kids")) {
        speak("Opening kids section");
        setShowSearch(false);
        navigate("/collection?section=kids");
      } else if (transcript.includes("open contact")) {
        speak("Opening contact page");
        setShowSearch(false);
        navigate("/contact");
      } else if (
        (transcript.includes("open search") ||
          transcript.includes("show search")) &&
        !showSearch
      ) {
        speak("Opening search");
        setShowSearch(true);
        navigate("/collection");
      } else if (
        (transcript.includes("close search") ||
          transcript.includes("hide search")) &&
        showSearch
      ) {
        speak("Closing search");
        setShowSearch(false);
      } else if (
        transcript.includes("open order") ||
        transcript.includes("open orders")
      ) {
        speak("Opening orders page");
        setShowSearch(false);
        navigate("/order");
      } else if (
        transcript.includes("open cart") ||
        transcript.includes("cart")
      ) {
        speak("Opening cart page");
        setShowSearch(false);
        navigate("/cart");
      } else {
        speak("Sorry, I did not understand. Please try again.");
      }
    };

    recognition.onerror = (e) => {
      if (e.error === "no-speech") {
        speak(
          "No speech detected. Please try speaking louder or check your microphone."
        );
        console.warn("No speech detected.");
      } else {
        speak("Speech recognition error occurred.");
        console.error("Speech recognition error:", e.error);
      }
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [navigate, setShowSearch, showSearch]);

  const handleClick = () => {
    if (recognitionRef.current) {
      speak("Listening, please speak your command.");
      recognitionRef.current.start();
    }
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] flex flex-col items-center"
      onClick={handleClick}
      title="Click and speak a command"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <img
        src={ai}
        className="w-[100px] md:w-[120px] lg:w-[160px] h-auto cursor-pointer"
        alt="AI icon"
      />
      {listening && (
        <p className="text-white mt-2 text-sm select-none">Listening...</p>
      )}
    </div>
  );
}

export default AI;
