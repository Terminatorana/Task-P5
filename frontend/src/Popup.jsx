import "./Post.css";

// Simple popup (modal). type = "success" or "error"
export default function Popup({ type, message, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup popup-${type}`}
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{type === "success" ? "Post sent" : "Error"}</h3>
        <p>{message}</p>
        <button type="button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
