"use client";
import { useState } from "react";
import { FileText, Download, X, Loader2, GraduationCap, FileDown } from "lucide-react";

const STUDENT  = "Tushar Barua";
const COURSE   = "Computer Graphics and Image Processing";
const DEPT     = "Department of Computer Science & Engineering";
const UNIV     = "University of Science and Technology Chittagong (USTC)";
const SEMESTER = "7th Semester";
const SESSION  = "January 2026 – June 2026";
const ADMISSION = "January 2023";

const labs = [
  {
    no: "01",
    title: "Installing OpenGL in Code::Blocks",
    objective: "Set up the OpenGL development environment using the freeglut library in Code::Blocks IDE on Windows.",
    tools: "Code::Blocks IDE, MinGW GCC compiler, freeglut 3.x, Windows OS",
    tasks: [
      "Downloaded freeglut MinGW package from transmissionzero.co.uk",
      "Copied freeglut.h and glut.h header files to MinGW/include/GL/",
      "Copied libfreeglut.a to MinGW/lib/ and freeglut.dll to System32",
      "Configured linker settings in Build Options: freeglut, opengl32, glu32",
      "Verified setup by rendering a white triangle in a 500x500 OpenGL window",
    ],
    learnings: [
      "Understood the OpenGL rendering pipeline: init → display callback → main loop",
      "Learned how static libraries (.a) and DLLs differ in linking",
      "Understood coordinate system setup using gluOrtho2D()",
      "glClear, glColor3f, glBegin/glEnd — the fundamental OpenGL draw cycle",
    ],
    outcome: "OpenGL environment configured. White triangle on black background confirmed the full pipeline works end-to-end.",
  },
  {
    no: "02",
    title: "Image Basics — I/O, Dimensions, Batch & Media",
    objective: "Master fundamental image and media file I/O operations using OpenCV and Python in VS Code / Google Colab.",
    tools: "Python 3, OpenCV (cv2), matplotlib, librosa, NumPy, Google Colab",
    tasks: [
      "Read and displayed a color image using cv2.imread() + matplotlib imshow()",
      "Inspected image shape (H x W x C), dtype, min/max, mean, std per channel",
      "Read image from local PC path and from Google Drive via Colab mount",
      "Batch loaded 1000 images using glob, resized all to 64x64, stacked into NumPy array",
      "Read video with cv2.VideoCapture() — extracted FPS, resolution, frame count",
      "Loaded audio with librosa, plotted waveform and STFT spectrogram",
    ],
    learnings: [
      "cv2 loads images in BGR order — must convert to RGB for correct matplotlib display",
      "Image is a 3D NumPy array of shape (H, W, C) with dtype uint8 (0-255)",
      "cv2.VideoCapture works for both files and webcam (index 0)",
      "librosa.load() returns (signal_array, sample_rate) — sr=None preserves original rate",
      "Generator pattern avoids loading all 1000 images into RAM simultaneously",
    ],
    outcome: "Complete image/media pipeline from disk I/O to batch processing and audio-visual analysis demonstrated successfully.",
  },
  {
    no: "03",
    title: "Intensity Transformations",
    objective: "Implement point-wise intensity transformation techniques from Chapter 3 of Gonzalez & Woods.",
    tools: "Python 3, OpenCV, NumPy, Gonzalez images — Fig 0354 (Einstein), Fig 0309 (Aerial), Fig 0305 (DFT), Fig 1060 (Car)",
    tasks: [
      "Image Complement: s = 255 - r, verified r + s = 255 for every pixel",
      "Gamma Correction: s = c*r^gamma — gamma=0.4 to brighten, gamma=2.5 to darken",
      "Log Transformation: s = c*log(1+r) — applied to spatial image and Fourier spectrum",
      "Image Subtraction: |f1-f2| with morphological cleanup and contour detection (Fig 1060)",
    ],
    learnings: [
      "Complement inverts intensity — useful for enhancing detail in dark image regions",
      "Gamma < 1 expands dark tones; gamma > 1 compresses them — used in display calibration",
      "Log transform compresses high-value dynamic range — essential for visualizing FFT spectrum",
      "Image subtraction isolates change regions — background pixels give |D| near 0",
      "Morphological close + open after threshold removes noise from the difference mask",
    ],
    outcome: "All transformations validated. Image subtraction with contour detection correctly localized the absent car object.",
  },
  {
    no: "04",
    title: "Histogram Analysis & Equalization",
    objective: "Analyze image intensity distributions and enhance contrast via histogram equalization (Gonzalez Ch. 3-4).",
    tools: "Python 3, OpenCV, NumPy, Gonzalez images — Fig 0459 (chest X-ray), Fig 0458 (blurry moon)",
    tasks: [
      "Computed and plotted grayscale histogram using cv2.calcHist()",
      "Plotted per-channel R, G, B histograms for a color image",
      "Implemented manual histogram equalization: sk = round(255 * CDF(k))",
      "Verified manual result is identical to cv2.equalizeHist() output",
      "Applied CLAHE (clipLimit=2.0, tileGridSize=8x8) for local contrast enhancement",
    ],
    learnings: [
      "Histogram shape reveals image quality — narrow peak means low contrast",
      "Equalization maps pixel values via the CDF to spread distribution uniformly",
      "Manual implementation matches cv2 exactly — confirms mathematical understanding",
      "CLAHE limits amplification in uniform regions — avoids noise blow-up unlike global HE",
      "Std deviation is a good single metric to compare contrast before/after equalization",
    ],
    outcome: "Std dev increased 58.4 to 73.8 after global equalization. CLAHE (std 69.1) gave better local detail without noise.",
  },
  {
    no: "05",
    title: "Line Drawing — DDA & Bresenham",
    objective: "Implement and compare rasterization algorithms for line drawing using OpenGL in Code::Blocks.",
    tools: "C++, OpenGL (GLUT), freeglut, Code::Blocks IDE, MinGW compiler",
    tasks: [
      "DDA: steps = max(|dx|,|dy|); xInc = dx/steps, yInc = dy/steps — plots round(x), round(y)",
      "Bresenham: error term err = dx-dy; update: if e2>-dy step x, if e2<dx step y",
      "Rendered lines for all slope cases: general, steep, negative, horizontal, vertical",
      "Used gluOrtho2D() to set pixel coordinate system (0,0) to (W,H)",
    ],
    learnings: [
      "DDA uses floating-point division — rounding errors accumulate over long lines",
      "Bresenham uses only integer addition/subtraction — no FPU needed, faster in hardware",
      "Both are O(max(|dx|,|dy|)) — linear time in line length",
      "glVertex2i() plots a single pixel; GL_POINTS mode renders discrete points",
      "gluOrtho2D maps world coordinates to window pixels — essential for pixel-exact drawing",
    ],
    outcome: "Both algorithms rendered accurate lines. Bresenham produced sharper results with zero floating-point artifacts.",
  },
  {
    no: "06",
    title: "2D Geometric Transformations",
    objective: "Implement Translation, Rotation, and Scaling using the OpenGL matrix stack in Code::Blocks.",
    tools: "C++, OpenGL (GLUT), freeglut, Code::Blocks IDE",
    tasks: [
      "Translation: glTranslatef(tx, ty, 0) — object shifted by vector (tx, ty)",
      "Rotation: glRotatef(angle, 0,0,1) about origin; T*R*T_inv for arbitrary pivot",
      "Scaling: glScalef(sx, sy, 1) — uniform and non-uniform; from a fixed point",
      "Combined TRS: OpenGL post-multiplies — functions listed last are applied first",
      "Used glPushMatrix / glPopMatrix to save and restore matrix state per object",
    ],
    learnings: [
      "All 2D transforms are 3x3 homogeneous matrices — allows combining via matrix multiply",
      "OpenGL matrix stack: glPushMatrix saves state, glPopMatrix restores — no side effects",
      "Rotation about arbitrary point = Translate to origin, Rotate, Translate back (T*R*T^-1)",
      "OpenGL call order is reverse of application order — last glXxx call applies first",
      "Non-uniform scaling (sx != sy) stretches shape — uniform preserves aspect ratio",
    ],
    outcome: "All 3 transformations applied correctly with color-coded objects demonstrating independent TRS combinations.",
  },
  {
    no: "07",
    title: "Otsu's Method for Image Segmentation",
    objective: "Implement global thresholding and Otsu's optimal threshold via between-class variance maximization (Ch. 10).",
    tools: "Python 3, OpenCV, NumPy, Gonzalez CH10 — septagon, noisy fingerprint, polymersomes, yeast cells",
    tasks: [
      "Global iterative: T* = 0.5*(mu1+mu2), converges in ~4 iterations from global mean",
      "Otsu: k* = argmax sigma_B^2(k), sigma_B^2 = P1*P2*(mu1-mu2)^2 — manual + cv2 verified",
      "5x5 box filter smoothing before Otsu — restores bimodal histogram on noisy images",
      "Gradient masking: Sobel |grad f| at 99.7th pct — compute Otsu on boundary pixels only",
      "Laplacian masking: |nabla^2 f| at 99.7th pct — isotropic, ideal for blob-shaped cells",
      "Percentile comparison: 99.7th (sparse) vs 90th (denser) on yeast cell image",
    ],
    learnings: [
      "Otsu works best on bimodal histograms — fails when foreground/background overlap heavily",
      "Separability eta = sigma_B^2(k*)/sigma_T^2 — objective measure of how well Otsu applies",
      "Gaussian noise spreads histogram peaks — smoothing restores bimodality before thresholding",
      "Gradient masking uses only edge pixels for threshold estimation — more discriminative",
      "Laplacian is isotropic (no directional preference) — better than Sobel for circular blobs",
      "Lower percentile = more pixels in mask = more robust T* but less pure boundary pixels",
    ],
    outcome: "Separability eta confirmed Otsu effectiveness. Masking techniques improved segmentation on non-bimodal histograms.",
  },
  {
    no: "08",
    title: "K-Means Clustering",
    objective: "Implement K-Means for image segmentation and color quantization using k-means++ initialization.",
    tools: "Python 3, OpenCV cv2.kmeans(), NumPy, Gonzalez images — Fig 0459 (chest X-ray), Fig 0457 (thumbprint)",
    tasks: [
      "Grayscale segmentation: reshape (H,W) to (N,1) float32, cv2.KMEANS_PP_CENTERS, K=3",
      "Reconstructed segmented image using cluster center LUT: centers[labels]",
      "Color quantization: reshape RGB (H,W,3) to (N,3), quantized to K=8 colors",
      "Computed WCSS = sum_k sum_(xi in Ck) ||xi - mu_k||^2 for K = 2 to 10",
      "Elbow method: identified optimal K from WCSS vs K plot",
    ],
    learnings: [
      "K-Means minimizes within-cluster variance (WCSS) — not globally optimal, depends on init",
      "k-means++ initialization picks spread-out starting centroids — avoids bad local minima",
      "cv2.kmeans() needs float32 input and returns (retval, labels, centers)",
      "centers[labels.flatten()] reconstructs the segmented image as a LUT lookup",
      "WCSS always decreases with more K — elbow identifies the point of diminishing returns",
      "Color quantization reduces file size while preserving visual appearance",
    ],
    outcome: "K=3 segmented intensity regions cleanly. Elbow showed diminishing WCSS improvement beyond K=5 for test images.",
  },
  {
    no: "09",
    title: "Edge Detection — Gonzalez & Woods Experiments",
    objective: "Implement and compare gradient-based and second-derivative edge detectors from Gonzalez & Woods Ch. 10.",
    tools: "Python 3, OpenCV, NumPy, Gonzalez CH09 — Fig 0914 (Lincoln penny), Fig 0911 (fingerprint), Fig 0939 (headCT)",
    tasks: [
      "Sobel: Gx=[-1 0+1;-2 0+2;-1 0+1], |grad f| = sqrt(Gx^2+Gy^2) — applied to Lincoln penny",
      "Prewitt: equal-weight 3x3 kernels via cv2.filter2D() — no 2x center weighting",
      "Roberts Cross: 2x2 diagonal kernels G1=[+1 0;0 -1], G2=[0+1;-1 0]",
      "LoG (Marr-Hildreth): GaussianBlur(sigma=1.4, 9x9) then Laplacian, vectorized zero-crossing",
      "Canny: compared (100,200) vs (50,150) vs (10,50) thresholds on headCT image",
    ],
    learnings: [
      "First-order operators (Sobel, Prewitt) respond to gradient magnitude — thick edges",
      "Roberts Cross is simple and fast but very sensitive to noise (small 2x2 kernel)",
      "Laplacian alone is too noisy — Gaussian pre-smoothing (LoG) is essential",
      "Zero-crossings of LoG give sub-pixel edge localization — more precise than gradient max",
      "Canny NMS thins edges to 1-pixel width — best spatial localization of all methods",
      "Canny hysteresis links weak edges to strong ones — avoids broken contours",
      "Higher T_high = only strongest edges kept; lower T_low = more weak edges linked",
    ],
    outcome: "Canny outperformed all others in localization and noise immunity. Optimal: Gaussian blur + Canny(50,150).",
  },
  {
    no: "10",
    title: "Course Summary & Key Formula Reference",
    objective: "Consolidate all 10 lab experiments and compile a complete formula and concept reference for the CGIP course.",
    tools: "All tools used across Labs 01-09: C++/OpenGL, Python, OpenCV, NumPy, librosa",
    tasks: [
      "Reviewed OpenGL rendering pipeline: init, display callback, matrix stack, main loop",
      "Summarized intensity transformations: complement, gamma, log, image subtraction",
      "Compiled histogram equalization: CDF-based mapping, manual vs cv2, CLAHE",
      "Compared line drawing: DDA floating-point vs Bresenham integer arithmetic",
      "Reviewed geometric transforms as 3x3 homogeneous matrices — TRS combined order",
      "Summarized segmentation: Otsu (bimodal), gradient/Laplacian masking, K-Means",
      "Ranked edge detectors: Roberts < Prewitt ~ Sobel < LoG < Canny by quality",
    ],
    learnings: [
      "Computer Graphics (Labs 01,05,06): OpenGL pipeline, rasterization, matrix transforms",
      "Image I/O & Basics (Lab 02): NumPy array structure, batch processing, media I/O",
      "Spatial Domain Processing (Labs 03,04): intensity transforms, histogram analysis",
      "Image Segmentation (Labs 07,08): thresholding, clustering, boundary-aware methods",
      "Feature Extraction (Lab 09): multi-scale edge detection, derivative operators",
      "Core insight: every image operation is a mapping from input pixel values to output values",
    ],
    outcome: "Full CGIP pipeline from basic rendering to advanced image analysis mastered and documented.",
  },
];

export default function SummaryReport() {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);

  async function handleDownloadDocx() {
    setLoadingDocx(true);
    try {
      const { Document, Packer, Paragraph, TextRun,
              AlignmentType,
              BorderStyle, ShadingType, TableRow, TableCell, Table, WidthType,
              convertInchesToTwip } = await import("docx");
      const { saveAs } = await import("file-saver");

      const BLUE  = "2563EB";
      const DARK  = "0F1722";
      const MID   = "475569";
      const GREEN = "16A34A";

      function heading(text: string) {
        return new Paragraph({
          children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Calibri" })],
          spacing: { before: 320, after: 80 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE } },
        });
      }

      function label(text: string) {
        return new TextRun({ text: text + "  ", bold: true, size: 18, color: MID, font: "Calibri" });
      }

      function body(text: string) {
        return new TextRun({ text, size: 18, color: DARK, font: "Calibri" });
      }

      function bullet(text: string, color = DARK) {
        return new Paragraph({
          children: [new TextRun({ text: "• " + text, size: 18, color, font: "Calibri" })],
          spacing: { after: 40 },
          indent: { left: convertInchesToTwip(0.2) },
        });
      }

      const children = [
        // ── Cover ──
        new Paragraph({
          children: [new TextRun({ text: "LAB SUMMARY REPORT", bold: true, size: 36, color: BLUE, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [new TextRun({ text: COURSE, bold: true, size: 48, color: DARK, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `${SEMESTER}  ·  ${SESSION}`, size: 22, color: MID, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Info table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            ["Submitted By", STUDENT],
            ["Department",   DEPT],
            ["University",   UNIV],
            ["Admission",    ADMISSION],
            ["Semester",     SEMESTER],
            ["Session",      SESSION],
          ].map(([l, v]) => new TableRow({
            children: [
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                shading: { type: ShadingType.SOLID, fill: "EFF6FF" },
                children: [new Paragraph({ children: [new TextRun({ text: l, bold: true, size: 18, color: BLUE, font: "Calibri" })] })],
              }),
              new TableCell({
                width: { size: 75, type: WidthType.PERCENTAGE },
                children: [new Paragraph({ children: [new TextRun({ text: v, size: 18, color: DARK, font: "Calibri" })] })],
              }),
            ],
          })),
        }),

        new Paragraph({ children: [], spacing: { after: 400 } }),

        // Overview
        heading("COURSE OVERVIEW"),
        new Paragraph({
          children: [body(
            "This report summarizes all 10 laboratory experiments in the Computer Graphics and Image Processing course at USTC. " +
            "Labs 01, 05, and 06 used C++ with OpenGL in Code::Blocks. " +
            "Labs 02-04 and 07-09 used Python with OpenCV in VS Code and Google Colab. " +
            "All image experiments used original figures from Gonzalez & Woods, DIP 3rd Edition."
          )],
          spacing: { after: 200 },
        }),

        // Labs
        ...labs.flatMap(lab => [
          new Paragraph({
            children: [
              new TextRun({ text: `LAB ${lab.no}  `, bold: true, size: 26, color: "FFFFFF", font: "Calibri", highlight: "darkBlue" }),
              new TextRun({ text: ` ${lab.title}`, bold: true, size: 26, color: BLUE, font: "Calibri" }),
            ],
            spacing: { before: 400, after: 120 },
          }),
          new Paragraph({ children: [label("Objective:"), body(lab.objective)], spacing: { after: 80 } }),
          new Paragraph({ children: [label("Tools:"), body(lab.tools)], spacing: { after: 120 } }),

          new Paragraph({
            children: [new TextRun({ text: "Tasks Performed", bold: true, size: 18, color: BLUE, font: "Calibri" })],
            spacing: { before: 80, after: 60 },
          }),
          ...lab.tasks.map(t => bullet(t)),

          new Paragraph({
            children: [new TextRun({ text: "What I Learned", bold: true, size: 18, color: GREEN, font: "Calibri" })],
            spacing: { before: 120, after: 60 },
          }),
          ...lab.learnings.map(l => bullet(l, GREEN)),

          new Paragraph({
            children: [
              new TextRun({ text: "Outcome:  ", bold: true, size: 18, color: BLUE, font: "Calibri" }),
              new TextRun({ text: lab.outcome, size: 18, color: DARK, font: "Calibri" }),
            ],
            spacing: { before: 120, after: 80 },
            shading: { type: ShadingType.SOLID, fill: "EFF6FF" },
          }),
        ]),

        // Formulas
        heading("KEY FORMULAS REFERENCE"),
        ...[
          ["Intensity Transformations", ["Complement: s = 255 - r", "Gamma: s = c * r^gamma (normalize r to [0,1])", "Log: s = c * log(1+r),  c = 255/log(1+r_max)", "Subtraction: D(x,y) = |f1(x,y) - f2(x,y)|"]],
          ["Histogram Equalization",    ["Normalized: p(rk) = H(k)/(MxN)", "CDF: CDF(k) = sum_j<=k p(rj)", "Mapping: sk = round(255*CDF(k))"]],
          ["Otsu's Method",             ["sigma_B^2(k) = P1*P2*(mu1-mu2)^2", "k* = argmax sigma_B^2(k)", "eta = sigma_B^2(k*)/sigma_T^2  (1=perfect)"]],
          ["K-Means",                   ["WCSS: J = sum_k sum_(xi in Ck) ||xi-mu_k||^2", "Convergence: ||center_new-center_old|| < epsilon", "Optimal K: elbow of WCSS vs K plot"]],
          ["Line Drawing",              ["DDA: steps=max(|dx|,|dy|); xInc=dx/steps (float)", "Bresenham: err=dx-dy; integer addition only"]],
          ["Edge Detection",            ["|grad f| = sqrt(Gx^2+Gy^2)", "LoG: nabla^2(G_sigma*f), zero-crossings (sigma=1.4)", "Canny: Gaussian>gradient>NMS>hysteresis", "T_high = 2*T_low"]],
          ["Geometric Transforms",      ["Translation: [1 0 tx; 0 1 ty; 0 0 1]", "Rotation: [cos -sin 0; sin cos 0; 0 0 1]", "Scaling: [sx 0 0; 0 sy 0; 0 0 1]"]],
        ].flatMap(([title, items]) => [
          new Paragraph({
            children: [new TextRun({ text: title as string, bold: true, size: 20, color: BLUE, font: "Calibri" })],
            spacing: { before: 200, after: 60 },
          }),
          ...(items as string[]).map(item =>
            new Paragraph({
              children: [new TextRun({ text: item, size: 18, font: "Courier New", color: DARK })],
              spacing: { after: 40 },
              shading: { type: ShadingType.SOLID, fill: "F8FAFC" },
              indent: { left: convertInchesToTwip(0.15) },
            })
          ),
        ]),
      ];

      const doc2 = new Document({
        sections: [{ children }],
        styles: {
          default: {
            document: {
              run: { font: "Calibri", size: 18, color: DARK },
            },
          },
        },
      });

      const blob = await Packer.toBlob(doc2);
      saveAs(blob, "CGIP_Lab_Summary_Report.docx");
    } finally {
      setLoadingDocx(false);
    }
  }

  async function handleDownload() {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const W      = 210;
      const margin = 15;
      const cw     = W - margin * 2;
      let   y      = 0;

      const accent   = [37, 99, 235]   as [number,number,number];
      const accentLt = [59, 130, 246]  as [number,number,number];
      const dark     = [15, 23, 42]    as [number,number,number];
      const mid      = [71, 85, 105]   as [number,number,number];
      const light    = [248, 250, 252] as [number,number,number];
      const white    = [255, 255, 255] as [number,number,number];
      const border   = [203, 213, 225] as [number,number,number];
      const blue100  = [219, 234, 254] as [number,number,number];
      const blue800  = [30,  64, 175]  as [number,number,number];
      const green600 = [22, 163,  74]  as [number,number,number];

      function addPage() { doc.addPage(); y = margin; }
      function checkY(need: number) { if (y + need > 283) addPage(); }

      // ── COVER ──────────────────────────────────────────────────────────────
      // Main blue bar
      doc.setFillColor(...accent);
      doc.rect(0, 0, W, 58, "F");
      // Right accent stripe
      doc.setFillColor(...accentLt);
      doc.rect(W - 42, 0, 42, 58, "F");
      // Subtle diagonal overlay
      doc.setFillColor(255, 255, 255);
      doc.setGState(doc.GState({ opacity: 0.04 }));
      doc.rect(0, 0, W, 58, "F");
      doc.setGState(doc.GState({ opacity: 1 }));

      doc.setTextColor(...white);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text("LAB SUMMARY REPORT", margin, 13);

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Computer Graphics &", margin, 27);
      doc.text("Image Processing", margin, 38);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`${SEMESTER}  ·  ${SESSION}`, margin, 47);
      doc.text("Gonzalez & Woods  ·  DIP 3rd Edition", margin, 53);

      y = 68;

      // Student / course info card
      doc.setFillColor(...light);
      doc.setDrawColor(...border);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y, cw, 46, 3, 3, "FD");

      // left accent bar on card
      doc.setFillColor(...accent);
      doc.roundedRect(margin, y, 3, 46, 1.5, 1.5, "F");

      const infoRows: [string, string][] = [
        ["SUBMITTED BY", STUDENT],
        ["COURSE",       COURSE],
        ["DEPARTMENT",   DEPT],
        ["UNIVERSITY",   UNIV],
        ["ADMISSION",    ADMISSION],
        ["SEMESTER",     SEMESTER],
        ["SESSION",      SESSION],
      ];
      infoRows.forEach(([label, value], i) => {
        const ry = y + 7 + i * 6;
        doc.setTextColor(...mid);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text(label, margin + 7, ry);
        doc.setTextColor(...dark);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", i === 0 ? "bold" : "normal");
        const lines = doc.splitTextToSize(value, cw - 48);
        doc.text(lines[0], margin + 46, ry);
      });
      y += 56;

      // Overview section
      doc.setTextColor(...accent);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text("COURSE OVERVIEW", margin, y);
      doc.setDrawColor(...accent);
      doc.setLineWidth(0.4);
      doc.line(margin, y + 1.5, margin + cw, y + 1.5);
      y += 7;

      doc.setTextColor(...dark);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const overviewText =
        "This report summarizes all 10 laboratory experiments conducted in the Computer Graphics and Image Processing " +
        "course at USTC. Labs 01, 05, and 06 were implemented in C++ with OpenGL using Code::Blocks IDE. " +
        "Labs 02-04 and 07-09 used Python with OpenCV in VS Code and Google Colab. " +
        "All image processing experiments utilized original figures from Gonzalez & Woods, DIP 3rd Edition.";
      const overLines = doc.splitTextToSize(overviewText, cw);
      doc.text(overLines, margin, y);
      y += overLines.length * 5 + 7;

      // Stats boxes
      const stats = [
        { v: "10",  l: "Total Labs"   },
        { v: "3",   l: "OpenGL / C++" },
        { v: "7",   l: "Python / CV"  },
        { v: "12+", l: "Gonzalez Figs"},
      ];
      const bw = (cw - 9) / 4;
      stats.forEach((s, i) => {
        const bx = margin + i * (bw + 3);
        doc.setFillColor(...accent);
        doc.roundedRect(bx, y, bw, 20, 2, 2, "F");
        doc.setTextColor(...white);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(s.v, bx + bw / 2, y + 12, { align: "center" });
        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.text(s.l, bx + bw / 2, y + 17.5, { align: "center" });
      });
      y += 28;

      // ── LAB ENTRIES ────────────────────────────────────────────────────────
      labs.forEach((lab) => {
        // height estimate
        const objL  = doc.splitTextToSize(lab.objective, cw).length;
        const toolL = doc.splitTextToSize(lab.tools, cw).length;
        let taskH = 0;
        lab.tasks.forEach(t => { taskH += doc.splitTextToSize(t, cw - 9).length * 4.5; });
        let learnH = 0;
        lab.learnings.forEach(l => { learnH += doc.splitTextToSize(l, cw - 9).length * 4.5; });
        const outL  = doc.splitTextToSize(lab.outcome, cw - 26).length;
        const need  = 12 + objL*5 + toolL*5 + 20 + taskH + 20 + learnH + outL*5 + 20;
        checkY(need);

        // Header
        doc.setFillColor(...accent);
        doc.roundedRect(margin, y, cw, 11, 2, 2, "F");
        doc.setTextColor(...white);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(`LAB ${lab.no}`, margin + 4, y + 7.5);
        // separator line
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.2);
        doc.line(margin + 17, y + 2, margin + 17, y + 9);
        doc.setFontSize(8.5);
        doc.text(lab.title, margin + 21, y + 7.5);
        y += 14;

        // Objective
        doc.setTextColor(...mid);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("OBJECTIVE", margin, y);
        y += 4;
        doc.setTextColor(...dark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        const objLines = doc.splitTextToSize(lab.objective, cw);
        doc.text(objLines, margin, y);
        y += objLines.length * 5 + 3;

        // Tools
        doc.setTextColor(...mid);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("TOOLS & RESOURCES", margin, y);
        y += 4;
        doc.setTextColor(...dark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        const toolLines = doc.splitTextToSize(lab.tools, cw);
        doc.text(toolLines, margin, y);
        y += toolLines.length * 5 + 4;

        // Tasks
        doc.setTextColor(...mid);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("TASKS PERFORMED", margin, y);
        y += 5;
        lab.tasks.forEach(task => {
          const tl = doc.splitTextToSize(task, cw - 9);
          checkY(tl.length * 4.5 + 2);
          doc.setFillColor(...accent);
          doc.circle(margin + 1.8, y - 0.5, 0.7, "F");
          doc.setTextColor(...dark);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.text(tl, margin + 5.5, y);
          y += tl.length * 4.5;
        });
        y += 4;

        // What I Learned
        doc.setTextColor(...green600);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("WHAT I LEARNED", margin, y);
        y += 5;
        lab.learnings.forEach(item => {
          const ll = doc.splitTextToSize(item, cw - 9);
          checkY(ll.length * 4.5 + 2);
          doc.setFillColor(...green600);
          doc.circle(margin + 1.8, y - 0.5, 0.7, "F");
          doc.setTextColor(...dark);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.text(ll, margin + 5.5, y);
          y += ll.length * 4.5;
        });
        y += 4;

        // Outcome
        const outLines = doc.splitTextToSize(lab.outcome, cw - 28);
        const outH = Math.max(11, outLines.length * 5 + 7);
        checkY(outH + 5);
        doc.setFillColor(...blue100);
        doc.setDrawColor(...accent);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, y, cw, outH, 1.5, 1.5, "FD");
        // left accent on outcome
        doc.setFillColor(...accent);
        doc.roundedRect(margin, y, 2.5, outH, 1, 1, "F");
        doc.setTextColor(...accent);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("OUTCOME", margin + 5, y + 5.5);
        doc.setTextColor(...blue800);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.text(outLines, margin + 25, y + 5.5);
        y += outH + 8;
      });

      // ── FORMULAS PAGE ───────────────────────────────────────────────────────
      addPage();
      doc.setFillColor(...accent);
      doc.rect(0, 0, W, 16, "F");
      doc.setFillColor(...accentLt);
      doc.rect(W - 42, 0, 42, 16, "F");
      doc.setTextColor(...white);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("KEY FORMULAS REFERENCE", margin, 11);
      y = 24;

      const formulaSections = [
        {
          title: "Intensity Transformations (Ch. 3)",
          items: [
            "Complement:      s = 255 - r",
            "Gamma:           s = c * r^gamma   (normalize r to [0,1] first)",
            "Log:             s = c * log(1+r),   c = 255 / log(1 + r_max)",
            "Subtraction:     D(x,y) = |f1(x,y) - f2(x,y)|",
          ],
        },
        {
          title: "Histogram Equalization (Ch. 3-4)",
          items: [
            "Normalized hist: p(rk) = H(k) / (M x N)",
            "CDF:             CDF(k) = sum_j<=k  p(rj)",
            "Mapping:         sk = round(255 * CDF(k))",
          ],
        },
        {
          title: "Otsu's Thresholding (Ch. 10)",
          items: [
            "Between-class:   sigma_B^2(k) = P1(k)*P2(k)*[mu1(k)-mu2(k)]^2",
            "Optimal T:       k* = argmax  sigma_B^2(k)",
            "Separability:    eta = sigma_B^2(k*) / sigma_T^2   (1 = perfect)",
          ],
        },
        {
          title: "K-Means Clustering",
          items: [
            "WCSS:            J = sum_k  sum_(xi in Ck)  ||xi - mu_k||^2",
            "Convergence:     ||center_new - center_old|| < epsilon",
            "Optimal K:       Elbow point on WCSS-vs-K plot",
          ],
        },
        {
          title: "Line Drawing Algorithms",
          items: [
            "DDA:             steps = max(|dx|,|dy|);   xInc = dx/steps  (float)",
            "Bresenham:       err = dx - dy;   update via integer addition only",
          ],
        },
        {
          title: "Edge Detection (Ch. 10)",
          items: [
            "Sobel:           |grad f| = sqrt(Gx^2 + Gy^2)",
            "LoG:             nabla^2(G_sigma * f),   zero-crossings   (sigma=1.4)",
            "Canny:           Gaussian smoothing > gradient > NMS > hysteresis",
            "Threshold rule:  T_high = 2 * T_low",
          ],
        },
        {
          title: "Geometric Transformations — 3x3 Homogeneous",
          items: [
            "Translation:     [ 1   0   tx;  0   1   ty;  0  0  1 ]",
            "Rotation:        [ cos -sin 0;  sin cos 0;   0  0  1 ]",
            "Scaling:         [ sx  0   0;   0   sy  0;   0  0  1 ]",
            "TRS order:       OpenGL: Scale applied first, then Rotate, then Translate",
          ],
        },
      ];

      formulaSections.forEach(sec => {
        checkY(14 + sec.items.length * 8);
        doc.setTextColor(...accent);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text(sec.title.toUpperCase(), margin, y);
        doc.setLineWidth(0.3);
        doc.setDrawColor(...accent);
        doc.line(margin, y + 1.5, margin + cw, y + 1.5);
        y += 6.5;

        sec.items.forEach(item => {
          checkY(9);
          doc.setFillColor(...light);
          doc.setDrawColor(...border);
          doc.roundedRect(margin, y - 3.5, cw, 7.5, 1, 1, "FD");
          doc.setTextColor(...dark);
          doc.setFont("courier", "normal");
          doc.setFontSize(7.5);
          doc.text(item, margin + 3, y + 1.5);
          y += 8;
        });
        y += 5;
      });

      // ── FOOTER ─────────────────────────────────────────────────────────────
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFillColor(...accent);
        doc.rect(0, 291, W, 9, "F");
        doc.setTextColor(...white);
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.text(`${STUDENT}  ·  ${COURSE}  ·  ${UNIV}`, margin, 296.5);
        doc.text(`Page ${p} of ${totalPages}`, W - margin, 296.5, { align: "right" });
      }

      doc.save("CGIP_Lab_Summary_Report.pdf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Banner ── */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <FileText size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-[var(--foreground)]">Lab Summary Report</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              10 Labs · Tasks · Learnings · Outcomes · Gonzalez &amp; Woods DIP 3rd Ed. · {SEMESTER}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOpen(true)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-2)] transition-all"
            >
              Preview
            </button>
            <button
              onClick={handleDownloadDocx}
              disabled={loadingDocx}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-60"
            >
              {loadingDocx ? <Loader2 size={12} className="animate-spin" /> : <FileDown size={12} />}
              {loadingDocx ? "Generating…" : ".docx"}
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
              {loading ? "Generating…" : ".pdf"}
            </button>
          </div>
        </div>
        <div className="flex border-t border-[var(--border)] divide-x divide-[var(--border)]">
          {[["10","Labs"],["3","OpenGL C++"],["7","Python/CV"],["12+","Gonzalez Figs"],["3–5","Pages"]].map(([v,l]) => (
            <div key={l} className="flex-1 py-2 text-center">
              <p className="text-sm font-black text-[var(--foreground)]">{v}</p>
              <p className="text-[10px] text-[var(--muted)]">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Preview Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[var(--background)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] shrink-0">
              <div>
                <p className="text-sm font-black text-[var(--foreground)]">Lab Summary Report</p>
                <p className="text-xs text-[var(--muted)]">{COURSE} · {SEMESTER} · {SESSION}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadDocx}
                  disabled={loadingDocx}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-60"
                >
                  {loadingDocx ? <Loader2 size={12} className="animate-spin" /> : <FileDown size={12} />}
                  {loadingDocx ? "Generating…" : ".docx"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                  {loading ? "Generating…" : ".pdf"}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-4">
              {/* Cover */}
              <div className="rounded-xl bg-blue-600 p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200 uppercase mb-2">Lab Summary Report</p>
                <p className="text-lg font-black text-white leading-tight">{COURSE}</p>
                <p className="text-xs text-blue-200 mt-1">{SEMESTER} · {SESSION} · Admitted {ADMISSION}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {([["Student", STUDENT], ["Department", DEPT], ["University", UNIV], ["Admission", ADMISSION], ["Session", SESSION]] as [string,string][]).map(([l,v]) => (
                    <div key={l} className="bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-blue-300 font-semibold">{l}</p>
                      <p className="text-xs text-white font-medium leading-snug">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-5 gap-2">
                {([["10","Labs"],["3","OpenGL C++"],["7","Python/CV"],["12+","Figs"],["3–5","Pages"]] as [string,string][]).map(([v,l]) => (
                  <div key={l} className="bg-blue-600 rounded-lg p-2.5 text-center">
                    <p className="text-base font-black text-white">{v}</p>
                    <p className="text-[9px] text-blue-200 leading-tight">{l}</p>
                  </div>
                ))}
              </div>

              {/* Lab cards */}
              {labs.map(lab => (
                <div key={lab.no} className="border border-[var(--border)] rounded-xl overflow-hidden">
                  <div className="bg-blue-600 px-4 py-2.5 flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-200 shrink-0">LAB {lab.no}</span>
                    <span className="w-px h-4 bg-blue-400/50 shrink-0" />
                    <span className="text-sm font-bold text-white leading-snug">{lab.title}</span>
                  </div>
                  <div className="p-4 space-y-3 bg-[var(--card)]">
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      <span className="font-semibold text-[var(--foreground)]">Objective: </span>{lab.objective}
                    </p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      <span className="font-semibold text-[var(--foreground)]">Tools: </span>{lab.tools}
                    </p>

                    {/* Tasks */}
                    <div>
                      <p className="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">Tasks Performed</p>
                      <ul className="space-y-1.5">
                        {lab.tasks.map((t, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted)] leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />{t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learnings */}
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <GraduationCap size={12} className="text-green-600 dark:text-green-400 shrink-0" />
                        <p className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">What I Learned</p>
                      </div>
                      <ul className="space-y-1.5">
                        {lab.learnings.map((l, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-300 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{l}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg px-3 py-2.5">
                      <p className="text-xs leading-relaxed text-blue-700 dark:text-blue-300">
                        <span className="font-semibold">Outcome: </span>{lab.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Formula preview */}
              <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="bg-blue-600 px-4 py-2.5">
                  <span className="text-sm font-bold text-white">Key Formulas Reference</span>
                </div>
                <div className="p-4 bg-[var(--card)] grid grid-cols-2 gap-2">
                  {[
                    "Complement: s = 255 − r",
                    "Gamma: s = c · r^γ",
                    "Log: s = c · log(1 + r)",
                    "Otsu: k* = argmax σ²B(k)",
                    "Equalization: sk = round(255·CDF(k))",
                    "K-Means: minimize WCSS = Σ||xi−μk||²",
                    "Canny: Gaussian→Gradient→NMS→Hysteresis",
                    "Bresenham: err = dx−dy (integer only)",
                  ].map(f => (
                    <div key={f} className="bg-[var(--background)] border border-[var(--border)] rounded px-2.5 py-1.5">
                      <p className="text-[10px] font-mono text-[var(--foreground)]">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
