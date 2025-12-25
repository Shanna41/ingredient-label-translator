import { useRef, useState } from "react";
import "../styles/LogoUploader.css";

/**
 * Props:
 * - onLogoUpload: (dataUrl: string | null) => void   // required
 * - maxSizeMB?: number (default 2)
 * - accept?: string (default "image/png,image/jpeg,image/svg+xml")
 * - forcePng?: boolean (default true)  // converts any image to PNG dataURL for PDF
 * - maxPreviewPx?: number (default 512) // scales down for preview/PNG conversion
 */
const LogoUploader = ({
  onLogoUpload,
  maxSizeMB = 2,
  accept = "image/png,image/jpeg,image/svg+xml",
  forcePng = true,
  maxPreviewPx = 512,
}) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const human = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validate = (file) => {
    if (!file) return "No file selected.";
    const ok = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!ok.includes(file.type)) {
      return `Unsupported type: ${file.type || "unknown"}. Use PNG, JPG, or SVG.`;
    }
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File too large: ${human(file.size)} (max ${maxSizeMB} MB).`;
    }
    return "";
  };

  const readAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  // Draw any image onto a canvas and export PNG dataURL (downscaled if needed).
  const toPngDataUrl = (dataUrl) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const scale = Math.min(1, maxPreviewPx / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Failed to load image for conversion."));
      img.src = dataUrl;
    });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const err = validate(file);
    if (err) {
      setError(err);
      return;
    }
    setError("");

    try {
      const rawDataUrl = await readAsDataUrl(file);
      const output = forcePng ? await toPngDataUrl(rawDataUrl) : rawDataUrl;
      setPreview(output);
      onLogoUpload?.(output);
    } catch  {
      setError("Unable to process image. Please try a different file.");
      setPreview(null);
      onLogoUpload?.(null);
    } finally {
      // allow re-selecting the same file
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clear = () => {
    setPreview(null);
    setError("");
    onLogoUpload?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="logo-uploader">
      <label htmlFor="logo-upload" className="uploader-label">
        Upload Clinic Logo
      </label>

      <input
        ref={inputRef}
        id="logo-upload"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="file-input"
        aria-describedby={error ? "logo-error" : "logo-hint"}
      />

      {error && (
        <div id="logo-error" className="uploader-error" role="alert">
          {error}
        </div>
      )}

      {preview && (
        <div id="logo-error" className="preview">
          <img src={preview} alt="Logo preview" className="preview-img" />
          <div className="preview-actions">
            <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => inputRef.current?.click()}
              aria-label="Replace logo">
              Replace
            </button>
            <button 
            type="button" 
            className="btn btn-danger" 
            onClick={clear}
            aria-label="Remove logo">
              Remove
            </button>
          </div>
          <div className="preview-hint">
            This preview is what will be embedded into your PDF.
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
