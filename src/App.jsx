import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const { register, watch } = useForm({
    defaultValues: {
      name: "",
      age: "",
      breed: "",
      about: "",
      traits: "",
      story: ""
    }
  });

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const previewRef = useRef();

  // Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const onDownloadPNG = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${watch("name") || "pet-resume"}.png`;
    link.click();
  };

  const onDownloadPDF = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const scale = width / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, canvas.height * scale);
    pdf.save(`${watch("name") || "pet-resume"}.pdf`);
  };

  const colors = {
    primary: "#774e31",
    secondary: "#ac6d3e",
    cream: "#f1e9df",
    lightBrown: "#bba699",
    lightCream: "#f8e9d6"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: `2px solid ${colors.lightBrown}`,
    borderRadius: "8px",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "border-color 0.3s"
  };

  const labelStyle = {
    display: "block",
    color: colors.primary,
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "1rem"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.lightCream} 100%)`,
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "30px",
        padding: "0 20px"
      }}>
        <h1 style={{
          color: colors.primary,
          fontSize: isMobile ? "2rem" : "3rem",
          margin: "0 0 10px 0",
          fontWeight: "700"
        }}>
          🐾 Pet Resume Generator
        </h1>
        <p style={{
          color: colors.secondary,
          fontSize: isMobile ? "1rem" : "1.1rem",
          margin: 0
        }}>
          Powered by The Bark Club
        </p>
      </div>

      {/* Main Content - TWO COLUMNS ON DESKTOP, ONE ON MOBILE */}
      <div style={{
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "0 20px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: "40px",
        alignItems: "start"
      }}>
        
        {/* Form Section */}
        <div style={{
          background: "white",
          padding: isMobile ? "20px" : "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(119, 78, 49, 0.1)",
          border: `2px solid ${colors.cream}`
        }}>
          <h2 style={{
            color: colors.primary,
            marginTop: 0,
            marginBottom: "25px",
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            borderBottom: `3px solid ${colors.secondary}`,
            paddingBottom: "10px"
          }}>
            Enter Pet Details
          </h2>

          {/* File Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>📷 Upload Photo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={onFileChange}
              style={{
                ...inputStyle,
                background: colors.lightCream,
                cursor: "pointer"
              }}
            />
          </div>

          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>🐕 Name</label>
            <input 
              {...register("name")} 
              placeholder="e.g., Tipu"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* Age */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>🎂 Age</label>
            <input 
              {...register("age")} 
              placeholder="e.g., 1 year old"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* Breed */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>🦴 Breed</label>
            <input 
              {...register("breed")} 
              placeholder="e.g., Indie"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* About */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>📝 About</label>
            <textarea 
              {...register("about")} 
              rows="3"
              placeholder="Tell us about this lovely dog..."
              style={{
                ...inputStyle,
                fontFamily: "inherit",
                resize: "vertical"
              }}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* Traits */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>✨ Traits</label>
            <input 
              {...register("traits")} 
              placeholder="e.g., Friendly, Playful, Foodie"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* Story */}
          <div style={{ marginBottom: "25px" }}>
            <label style={labelStyle}>💭 Story</label>
            <textarea 
              {...register("story")} 
              rows="3"
              placeholder="Share their rescue story..."
              style={{
                ...inputStyle,
                fontFamily: "inherit",
                resize: "vertical"
              }}
              onFocus={(e) => e.target.style.borderColor = colors.secondary}
              onBlur={(e) => e.target.style.borderColor = colors.lightBrown}
            />
          </div>

          {/* Buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "15px",
            marginTop: "30px"
          }}>
            <button 
              onClick={onDownloadPNG}
              style={{
                flex: 1,
                padding: "14px 24px",
                background: colors.secondary,
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 4px 10px rgba(172, 109, 62, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.secondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              📥 Download PNG
            </button>
            
            <button 
              onClick={onDownloadPDF}
              style={{
                flex: 1,
                padding: "14px 24px",
                background: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 4px 10px rgba(119, 78, 49, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#5a3a24";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <div 
            ref={previewRef}
            style={{
              background: "white",
              padding: isMobile ? "25px" : "40px",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(119, 78, 49, 0.15)",
              border: `3px solid ${colors.cream}`,
              minHeight: "600px"
            }}
          >
            {/* Pet Name */}
            <h2 style={{
              color: colors.primary,
              margin: "0 0 25px 0",
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              textAlign: "center",
              borderBottom: `4px solid ${colors.secondary}`,
              paddingBottom: "15px",
              fontWeight: "700",
              wordBreak: "break-word"
            }}>
              {watch("name") || "Unnamed Pet"} 🐾
            </h2>

            {/* Photo */}
            {photoDataUrl ? (
              <img 
                src={photoDataUrl} 
                alt="pet" 
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "25px",
                  border: `4px solid ${colors.cream}`
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "350px",
                background: colors.lightCream,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                marginBottom: "25px",
                border: `3px dashed ${colors.lightBrown}`,
                color: colors.lightBrown,
                fontSize: "1.2rem",
                fontWeight: "500"
              }}>
                📷 No photo yet
              </div>
            )}

            {/* Info Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "25px",
              padding: "20px",
              background: colors.lightCream,
              borderRadius: "10px"
            }}>
              <div>
                <p style={{
                  margin: "0 0 5px 0",
                  color: colors.secondary,
                  fontWeight: "600",
                  fontSize: "0.9rem"
                }}>
                  BREED
                </p>
                <p style={{
                  margin: 0,
                  color: colors.primary,
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  wordBreak: "break-word"
                }}>
                  {watch("breed") || "Unknown"}
                </p>
              </div>
              <div>
                <p style={{
                  margin: "0 0 5px 0",
                  color: colors.secondary,
                  fontWeight: "600",
                  fontSize: "0.9rem"
                }}>
                  AGE
                </p>
                <p style={{
                  margin: 0,
                  color: colors.primary,
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  wordBreak: "break-word"
                }}>
                  {watch("age") || "Unknown"}
                </p>
              </div>
            </div>

            {/* About */}
            {watch("about") && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: colors.secondary,
                  margin: "0 0 10px 0",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  About Me
                </h3>
                <p style={{
                  color: colors.primary,
                  margin: 0,
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  {watch("about")}
                </p>
              </div>
            )}

            {/* Traits */}
            {watch("traits") && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: colors.secondary,
                  margin: "0 0 10px 0",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  Personality Traits
                </h3>
                <p style={{
                  color: colors.primary,
                  margin: 0,
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  {watch("traits")}
                </p>
              </div>
            )}

            {/* Story */}
            {watch("story") && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: colors.secondary,
                  margin: "0 0 10px 0",
                  fontSize: "1.3rem",
                  fontWeight: "600"
                }}>
                  My Story
                </h3>
                <p style={{
                  color: colors.primary,
                  margin: 0,
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  {watch("story")}
                </p>
              </div>
            )}

            {/* Footer inside resume */}
            <div style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: `2px solid ${colors.cream}`,
              textAlign: "center",
              color: colors.lightBrown,
              fontSize: "0.9rem"
            }}>
              🐾 Generated by The Bark Club Pet Resume Tool
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Outside the resume */}
      <div style={{
        width: "100%",
        maxWidth: "1600px",
        margin: "40px auto 20px auto",
        padding: "30px 20px",
        textAlign: "center",
        borderTop: `3px solid ${colors.secondary}`,
        color: colors.primary
      }}>
        <p style={{
          fontSize: isMobile ? "1rem" : "1.2rem",
          margin: "0",
          fontWeight: "500"
        }}>
          Made with 🐾 from Tejas & TBC ©
        </p>
        <p style={{
          fontSize: "0.9rem",
          margin: "10px 0 0 0",
          color: colors.secondary
        }}>
          Helping shelter dogs find their forever homes 🏠❤️
        </p>
      </div>
    </div>
  );
}

export default App;