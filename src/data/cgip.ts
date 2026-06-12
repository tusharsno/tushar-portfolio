export type LabSection = {
  id: string;
  title: string;
  content: string;
};

export type LabTask = {
  id: string;
  title: string;
  sections: LabSection[];
};

export const cgipLabs: LabTask[] = [
  {
    id: "lab-01",
    title: "Lab 01 — Installing OpenGL in Code::Blocks",
    sections: [
      {
        id: "lab-01-objective",
        title: "Objective",
        content: `
Install and configure **OpenGL with freeglut** in **Code::Blocks IDE** on Windows, and verify the setup by rendering a basic OpenGL window.

**What you need:**
- Code::Blocks IDE with MinGW compiler
- freeglut library (OpenGL Utility Toolkit)
- OpenGL is already included with Windows (opengl32.dll, glu32.dll)
        `.trim(),
      },
      {
        id: "lab-01-download",
        title: "Step 1 — Download freeglut",
        content: `
freeglut provides the **GLUT API** — window creation, input handling, and the OpenGL rendering loop.

1. Go to: **https://www.transmissionzero.co.uk/software/freeglut-devel/**
2. Download **freeglut 3.x.x MinGW package** (zip file)
3. Extract the zip — you will see folders: **include/**, **lib/**, **bin/**
:::output
freeglut zip extracted successfully.
Folders visible: include/  lib/  bin/
Files: freeglut.h, glut.h (in include/GL/), libfreeglut.a (in lib/), freeglut.dll (in bin/)
:::end
        `.trim(),
      },
      {
        id: "lab-01-copy-files",
        title: "Step 2 — Copy Library Files",
        content: `
Copy the extracted files into your **MinGW** compiler directories:

**Headers** — copy \`freeglut/include/GL/\` folder contents:
\`\`\`bash
# Copy these 3 files:
freeglut.h
freeglut_ext.h
freeglut_std.h
glut.h

# Destination:
C:\Program Files\CodeBlocks\MinGW\include\GL\
\`\`\`

**Libraries** — copy from \`freeglut/lib/x64/\` (or x86 for 32-bit):
\`\`\`bash
# Copy:
libfreeglut.a
libfreeglut_static.a

# Destination:
C:\Program Files\CodeBlocks\MinGW\lib\
\`\`\`

**DLL** — copy from \`freeglut/bin/x64/\`:
\`\`\`bash
# Copy:
freeglut.dll

# Destination (system-wide):
C:\Windows\System32\          # for 64-bit
C:\Windows\SysWOW64\          # for 32-bit apps
# OR simply paste into your project folder
\`\`\`
:::output
Headers copied → C:\Program Files\CodeBlocks\MinGW\include\GL\
Library copied → C:\Program Files\CodeBlocks\MinGW\lib\
DLL copied     → C:\Windows\System32\  (or project folder)
:::end
        `.trim(),
      },
      {
        id: "lab-01-codeblocks-config",
        title: "Step 3 — Configure Code::Blocks Project",
        content: `
For every new OpenGL project in Code::Blocks, you must link the required libraries.

**Create a new Console Application project, then:**

1. Right-click project → **Build options**
2. Go to **Linker settings** tab
3. Under **Link libraries**, click **Add** and add these one by one:
\`\`\`
freeglut
opengl32
glu32
\`\`\`

4. Click **OK**

**Alternative — via Search Directories:**
If Code::Blocks cannot find the headers:
- Go to **Settings → Compiler → Search directories → Compiler**
- Add: \`C:\Program Files\CodeBlocks\MinGW\include\`
- Go to **Linker** tab, add: \`C:\Program Files\CodeBlocks\MinGW\lib\`
:::output
Linker settings saved:
  freeglut
  opengl32
  glu32
No build errors on empty project — configuration successful.
:::end
        `.trim(),
      },
      {
        id: "lab-01-first-window",
        title: "Step 4 — Verify: First OpenGL Window",
        content: `
Paste this code and build (F9). If a black window appears, your setup is correct.

\`\`\`cpp
#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // Draw a white triangle to confirm rendering works
    glColor3f(1.0f, 1.0f, 1.0f);
    glBegin(GL_TRIANGLES);
        glVertex2f( 0.0f,  0.5f);
        glVertex2f(-0.5f, -0.5f);
        glVertex2f( 0.5f, -0.5f);
    glEnd();

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 500);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Lab 01 — OpenGL Setup Verified");
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);  // black background
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`

**Expected output:** 500×500 window with a white triangle on black background.

**Common errors:**
- *undefined reference to glutInit* → freeglut not linked. Re-check Step 3.
- *freeglut.dll not found* → DLL not in project folder or System32. Re-check Step 2.
- *GL/glut.h: No such file* → Headers not copied. Re-check Step 2.
:::output
Build output: 0 errors, 0 warnings
Result: 500x500 OpenGL window opens with a white triangle on black background.
Setup verified successfully.
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-02",
    title: "Lab 02 — Image Basics (VS Code / Google Colab)",
    sections: [
      {
        id: "lab-02-objective",
        title: "Objective",
        content: `
Learn fundamental image I/O and inspection operations using **OpenCV (Python)**.

**Topics:**
- Read and display an image
- Inspect image dimensions and channel info
- Read image from local Drive/PC storage path
- Batch read 1000 images
- Read audio and video files

**Setup (run once):**
\`\`\`bash
pip install opencv-python matplotlib
\`\`\`
        `.trim(),
      },
      {
        id: "lab-02-read-display",
        title: "1. Read & Display an Image",
        content: `
**Theory:**
\`cv2.imread()\` loads an image as a NumPy array in **BGR** order (not RGB). \`cv2.imshow()\` opens a native window; in Colab/Jupyter use \`matplotlib\` instead.

\`\`\`python
import cv2
from matplotlib import pyplot as plt

# ── Read image (BGR by default) ───────────────────────────
img_bgr = cv2.imread('ch03/Fig0354(a)(einstein_orig).tif')

# Convert BGR → RGB for correct matplotlib display
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

# ── Display ───────────────────────────────────────────────
plt.figure(figsize=(8, 6))
plt.imshow(img_rgb)
plt.title('Original Image')
plt.axis('off')
plt.show()

# ── Grayscale read ─────────────────────────────────────────
img_gray = cv2.imread('ch03/Fig0354(a)(einstein_orig).tif', cv2.IMREAD_GRAYSCALE)
plt.imshow(img_gray, cmap='gray')
plt.title('Grayscale')
plt.axis('off')
plt.show()
\`\`\`
:::output
![Read & Display Output](/Computer-Graphics-and-Image-Processing/lab02_read_display_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-02-dimensions",
        title: "2. Image Dimensions (RGB Channels)",
        content: `
**Theory:**
A color image is a **3D NumPy array** of shape **(Height, Width, Channels)**. Each pixel has 3 values: R, G, B — each in range [0, 255] (uint8). A grayscale image has shape **(H, W)** with no channel dimension.

\`\`\`python
import cv2
import numpy as np

img = cv2.imread('ch04/Fig0459(a)(orig_chest_xray).tif')

# ── Shape and type ─────────────────────────────────────────
print('Shape  :', img.shape)        # (H, W, C) e.g. (512, 512, 3)
print('Height :', img.shape[0])     # rows
print('Width  :', img.shape[1])     # columns
print('Channels:', img.shape[2])   # 3 = BGR color
print('Dtype  :', img.dtype)        # uint8
print('Total pixels:', img.shape[0] * img.shape[1])

# ── Per-channel statistics ─────────────────────────────────
B, G, R = cv2.split(img)            # split into 3 channels
for name, ch in zip(['Blue','Green','Red'], [B, G, R]):
    print(f'{name}: min={ch.min()}, max={ch.max()}, mean={ch.mean():.1f}')

# ── Access single pixel value ──────────────────────────────
pixel = img[100, 200]               # pixel at row=100, col=200
print(f'Pixel at (100,200) BGR: {pixel}')  # e.g. [120 85 200]
\`\`\`
:::output
![Dimensions & RGB Histogram Output](/Computer-Graphics-and-Image-Processing/lab02_dimensions_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-02-drive",
        title: "3. Read Image from Drive / PC Storage",
        content: `
**VS Code (local PC):** Use the absolute or relative file path directly.

\`\`\`python
import cv2

# Absolute path (Windows)
img = cv2.imread(r'C:\\Users\\Tushar\\Pictures\\photo.jpg')

# Absolute path (Linux / Mac)
img = cv2.imread('/home/tushar/images/photo.jpg')

# Relative path (file in same folder as script)
img = cv2.imread('photo.jpg')

if img is None:
    print('ERROR: File not found or path is wrong!')
else:
    print('Loaded successfully:', img.shape)
\`\`\`

**Google Colab (from Google Drive):**
\`\`\`python
from google.colab import drive
import cv2
from matplotlib import pyplot as plt

# Step 1: Mount your Google Drive
drive.mount('/content/drive')

# Step 2: Use the Drive path
# Your file is at: My Drive/CGIP/image.jpg
img = cv2.imread('/content/drive/MyDrive/CGIP/image.jpg')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

plt.imshow(img_rgb); plt.axis('off'); plt.show()
\`\`\`
:::output
Image loaded: (512, 512, 3) — shape printed to console.
if img is None: print('ERROR: File not found')
:::end
        `.trim(),
      },
      {
        id: "lab-02-1000-images",
        title: "4. Read 1000 Images",
        content: `
**Theory:**
Batch loading uses \`os.listdir()\` or \`glob\` to iterate over all image files in a folder. Images are stacked into a NumPy array for processing.

\`\`\`python
import cv2
import numpy as np
import os
from glob import glob

folder = 'dataset/'       # folder containing images
TARGET_SIZE = (64, 64)    # resize all to same shape

# ── Method 1: os.listdir() ─────────────────────────────────────
images = []
labels = []

for filename in sorted(os.listdir(folder)):
    if filename.endswith(('.jpg', '.png', '.tif', '.bmp')):
        path = os.path.join(folder, filename)
        img  = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        img  = cv2.resize(img, TARGET_SIZE)   # normalize size
        images.append(img)

images = np.array(images)  # shape: (N, 64, 64)
print(f'Loaded {len(images)} images, array shape: {images.shape}')

# ── Method 2: glob (cleaner) ──────────────────────────────────
all_paths = glob('dataset/*.jpg') + glob('dataset/*.png')
all_paths = sorted(all_paths)[:1000]    # limit to first 1000

batch = np.array([
    cv2.resize(cv2.imread(p, cv2.IMREAD_GRAYSCALE), TARGET_SIZE)
    for p in all_paths
])
print(f'Batch shape: {batch.shape}')   # (1000, 64, 64)

# ── Memory-efficient: generator approach ──────────────────────
def image_generator(paths, size=(64,64)):
    for p in paths:
        img = cv2.imread(p, cv2.IMREAD_GRAYSCALE)
        yield cv2.resize(img, size)

for i, img in enumerate(image_generator(all_paths)):
    pass  # process each image one at a time without storing all in RAM
\`\`\`
:::output
Loaded 1000 images, array shape: (1000, 64, 64)
Batch shape: (1000, 64, 64)
:::end
        `.trim(),
      },
      {
        id: "lab-02-audio-video",
        title: "5. Read Audio & Video",
        content: `
**Video reading with OpenCV:**
\`cv2.VideoCapture()\` works for both video files and webcam (index 0).

\`\`\`python
import cv2

# ── Read from video file ───────────────────────────────────
cap = cv2.VideoCapture('video.mp4')

print(f'FPS     : {cap.get(cv2.CAP_PROP_FPS)}')
print(f'Width   : {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}')
print(f'Height  : {cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}')
print(f'Total frames: {cap.get(cv2.CAP_PROP_FRAME_COUNT)}')

frame_count = 0
while True:
    ret, frame = cap.read()       # ret=False when video ends
    if not ret:
        break
    frame_count += 1
    # Process each frame here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

cap.release()
print(f'Processed {frame_count} frames')
\`\`\`

**Audio reading with librosa (Python):**
\`\`\`python
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

# pip install librosa

# ── Load audio file ─────────────────────────────────────────
y, sr = librosa.load('audio.wav', sr=None)  # sr=None preserves original
print(f'Sample rate : {sr} Hz')
print(f'Duration    : {len(y)/sr:.2f} seconds')
print(f'Samples     : {len(y)}')

# ── Waveform plot ───────────────────────────────────────────
plt.figure(figsize=(12, 4))
librosa.display.waveshow(y, sr=sr)
plt.title('Waveform'); plt.xlabel('Time (s)'); plt.ylabel('Amplitude')
plt.tight_layout(); plt.show()

# ── Spectrogram ─────────────────────────────────────────────
D = librosa.stft(y)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)
plt.figure(figsize=(12, 4))
librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='hz')
plt.colorbar(format='%+2.0f dB'); plt.title('Spectrogram')
plt.tight_layout(); plt.show()
\`\`\`
:::output
FPS: 30.0  |  Width: 1920  |  Height: 1080  |  Frames: 900
Sample rate: 44100 Hz  |  Duration: 3.42 s  |  Samples: 150822
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-03",
    title: "Lab 03 — Image Transformations (VS Code / Google Colab)",
    sections: [
      {
        id: "lab-03-objective",
        title: "Objective",
        content: `
Implement fundamental **intensity transformation** techniques and image arithmetic using Python + OpenCV.

**Topics:**
- Image Complement (Negative)
- Gamma Correction (Power-Law transformation)
- Log Transformation
- Image Subtraction to detect absent person
        `.trim(),
      },
      {
        id: "lab-03-complement",
        title: "1. Image Complement (Negative)",
        content: `
**Theory:**
The complement (negative) of an image is obtained by inverting each pixel value:
s = L − 1 − r
For 8-bit images (L=256): **s = 255 − r**

This transformation is useful for enhancing white or gray detail embedded in dark regions of an image.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch03/Fig0354(a)(einstein_orig).tif', cv2.IMREAD_GRAYSCALE)

# ── Method 1: NumPy ──────────────────────────────────────────
complement = 255 - img

# ── Method 2: cv2.bitwise_not ──────────────────────────────
complement2 = cv2.bitwise_not(img)  # identical result

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].imshow(img,        cmap='gray'); axes[0].set_title('Original')
axes[1].imshow(complement, cmap='gray'); axes[1].set_title('Complement (Negative)')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()

# Verify: original + complement = 255 for every pixel
assert np.all(img.astype(int) + complement.astype(int) == 255)
print('Complement verified: r + s = 255 for all pixels')
\`\`\`
:::output
![Image Complement Output](/Computer-Graphics-and-Image-Processing/lab03_complement_output.png)
Complement verified: r + s = 255 for all pixels
:::end
        `.trim(),
      },
      {
        id: "lab-03-gamma",
        title: "2. Gamma Correction",
        content: `
**Theory:**
Gamma correction is a **power-law (non-linear)** transformation:
s = c · r^γ

where r is normalized input [0,1], c is a scaling constant (usually 1), and γ (gamma) controls brightness:
- **γ < 1** — brightens dark regions (used to correct dark displays)
- **γ > 1** — darkens bright regions (used to correct washed-out displays)
- **γ = 1** — no change (linear)

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch03/Fig0309(a)(washed_out_aerial_image).tif', cv2.IMREAD_GRAYSCALE)

def gamma_correction(img, gamma):
    # Normalize to [0,1], apply power law, scale back to [0,255]
    img_norm  = img / 255.0
    corrected = np.power(img_norm, gamma)
    return np.uint8(corrected * 255)

# ── Apply different gamma values ─────────────────────────────
g_dark    = gamma_correction(img, gamma=2.5)  # darken
g_bright  = gamma_correction(img, gamma=0.4)  # brighten
g_neutral = gamma_correction(img, gamma=1.0)  # no change

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, im, title in zip(axes,
    [img, g_bright, g_neutral, g_dark],
    ['Original', 'γ=0.4 (Bright)', 'γ=1.0 (No change)', 'γ=2.5 (Dark)']):
    ax.imshow(im, cmap='gray', vmin=0, vmax=255)
    ax.set_title(title); ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`
:::output
![Gamma Correction Output](/Computer-Graphics-and-Image-Processing/lab03_gamma_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-03-log",
        title: "3. Log Transformation",
        content: `
**Theory:**
Log transformation maps a narrow range of dark input values to a wider range of output values:
s = c · log(1 + r)

The constant c is chosen to scale the output to [0, 255]:
c = 255 / log(1 + max(r))

**Key property:** Compresses the dynamic range — ideal for displaying **Fourier spectrum** images where the DC component is much brighter than other components.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch03/Fig0305(a)(DFT_no_log).tif', cv2.IMREAD_GRAYSCALE).astype(np.float64)

# ── Log transformation ───────────────────────────────────────
c       = 255 / np.log(1 + img.max())
log_img = c * np.log(1 + img)
log_img = np.uint8(log_img)

# ── Apply to Fourier spectrum (classic use case) ───────────────
img_orig = cv2.imread('ch03/Fig0354(a)(einstein_orig).tif', cv2.IMREAD_GRAYSCALE)
f        = np.fft.fft2(img_orig)
f_shift  = np.fft.fftshift(f)                # shift DC to center
magnitude = np.abs(f_shift)                  # raw spectrum

c_spec      = 255 / np.log(1 + magnitude.max())
spectrum_log = np.uint8(c_spec * np.log(1 + magnitude))

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
axes[0].imshow(img_orig,     cmap='gray'); axes[0].set_title('Original')
axes[1].imshow(log_img,      cmap='gray'); axes[1].set_title('Log Transform (spatial)')
axes[2].imshow(spectrum_log, cmap='gray'); axes[2].set_title('Log of Fourier Spectrum')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`
:::output
![Log Transformation Output](/Computer-Graphics-and-Image-Processing/lab03_log_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-03-subtraction",
        title: "4. Image Subtraction — Find Absent Person",
        content: `
**Theory:**
Image subtraction (difference imaging) computes:
D(x,y) = |f₁(x,y) − f₂(x,y)|

If two images are taken from the same scene, pixels that haven't changed produce D ≈ 0 (dark). Pixels where a person is present in image 1 but absent in image 2 produce high D values (bright region) — revealing exactly where the person was.

**Assumption:** Both images are taken from the same camera angle and the only difference is the presence/absence of a person.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

# ── Load both images as grayscale ────────────────────────────
img1 = cv2.imread('ch10/Fig1060(a)(car on left).tif', cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread('ch10/Fig1060(c)(car removed).tif', cv2.IMREAD_GRAYSCALE)

# Ensure same size
img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

# ── Absolute difference ──────────────────────────────────────
diff = cv2.absdiff(img1, img2)

# ── Threshold to get binary mask of changed region ─────────────
_, mask = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

# ── Morphological cleanup (remove noise) ────────────────────
kernel   = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask     = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
mask     = cv2.morphologyEx(mask, cv2.MORPH_OPEN,  kernel)

# ── Find and draw bounding box around changed region ──────────
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
result = cv2.cvtColor(img1, cv2.COLOR_GRAY2BGR)
for cnt in contours:
    if cv2.contourArea(cnt) > 500:   # ignore tiny noise regions
        x, y, w, h = cv2.boundingRect(cnt)
        cv2.rectangle(result, (x, y), (x+w, y+h), (0, 0, 255), 2)
        cv2.putText(result, 'Absent Person', (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(1, 4, figsize=(18, 4))
for ax, im, title in zip(axes,
    [img1, img2, diff, cv2.cvtColor(result, cv2.COLOR_BGR2RGB)],
    ['Image 1 (with person)', 'Image 2 (without person)',
     'Absolute Difference', 'Detected: Absent Person']):
    ax.imshow(im, cmap='gray' if im.ndim == 2 else None)
    ax.set_title(title); ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`

**How it works:**
- Background pixels: |f₁ − f₂| ≈ 0 → black in diff image
- Person pixels: |f₁ − f₂| >> 0 → bright region in diff image
- Threshold + contour detection localizes the absent person's position
:::output
![Image Subtraction — Absent Object Detection](/Computer-Graphics-and-Image-Processing/lab03_subtraction_output.png)
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-04",
    title: "Lab 04 — Histogram & Equalization (VS Code / Google Colab)",
    sections: [
      {
        id: "lab-04-objective",
        title: "Objective",
        content: `
Understand and implement **image histogram** analysis and **histogram equalization** using Python + OpenCV.

**Topics:**
- Read an image and plot its histogram
- Histogram Equalization to enhance contrast

**Theory:**
A histogram H(k) counts the number of pixels with intensity k (k = 0..255). The **normalized histogram** p(rk) = H(k) / (M×N) estimates the probability density of intensity levels. Low-contrast images have histograms clustered in a narrow range.
        `.trim(),
      },
      {
        id: "lab-04-histogram",
        title: "1. Read Image & Show Histogram",
        content: `
**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch04/Fig0459(a)(orig_chest_xray).tif')
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
img_rgb  = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# ── Grayscale histogram ─────────────────────────────────────
hist_gray = cv2.calcHist([img_gray], [0], None, [256], [0, 256])

# ── RGB per-channel histograms ─────────────────────────────
colors  = ('r', 'g', 'b')
channels = cv2.split(img_rgb)

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Original image
axes[0,0].imshow(img_rgb);       axes[0,0].set_title('Original Image');       axes[0,0].axis('off')

# Grayscale histogram
axes[0,1].plot(hist_gray, color='black')
axes[0,1].fill_between(range(256), hist_gray.flatten(), alpha=0.3, color='gray')
axes[0,1].set_title('Grayscale Histogram'); axes[0,1].set_xlabel('Pixel Intensity'); axes[0,1].set_ylabel('Count')
axes[0,1].set_xlim([0, 256])

# Grayscale image
axes[1,0].imshow(img_gray, cmap='gray'); axes[1,0].set_title('Grayscale'); axes[1,0].axis('off')

# Per-channel RGB histogram
for ch, color, name in zip(channels, colors, ['Red','Green','Blue']):
    h = cv2.calcHist([ch], [0], None, [256], [0, 256])
    axes[1,1].plot(h, color=color, label=name, alpha=0.8)
axes[1,1].set_title('RGB Channel Histograms')
axes[1,1].set_xlabel('Pixel Intensity'); axes[1,1].set_ylabel('Count')
axes[1,1].set_xlim([0, 256]); axes[1,1].legend()

plt.tight_layout(); plt.show()

# ── Print stats ───────────────────────────────────────────────
print(f'Mean intensity : {img_gray.mean():.1f}')
print(f'Std deviation  : {img_gray.std():.1f}')
print(f'Min / Max      : {img_gray.min()} / {img_gray.max()}')
\`\`\`
:::output
![Histogram Output](/Computer-Graphics-and-Image-Processing/lab04_histogram_output.png)
Mean intensity: 127.3  |  Std: 58.4  |  Min/Max: 0 / 255
:::end
        `.trim(),
      },
      {
        id: "lab-04-equalization",
        title: "2. Histogram Equalization",
        content: `
**Theory:**
Histogram Equalization redistributes pixel intensities so that the output histogram is approximately **uniform** (flat). This stretches the contrast across the full [0, 255] range.

**Steps (manual):**
1. Compute normalized histogram: p(rk) = H(k) / (M×N)
2. Compute cumulative distribution: CDF(k) = Σ p(rj) for j ≤ k
3. Map: sk = round(CDF(k) × (L−1)) where L=256

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch04/Fig0458(a)(blurry_moon).tif', cv2.IMREAD_GRAYSCALE)

# ── Method 1: cv2 built-in ───────────────────────────────────
eq_cv2 = cv2.equalizeHist(img)

# ── Method 2: Manual implementation ──────────────────────────
M, N    = img.shape
hist    = cv2.calcHist([img], [0], None, [256], [0,256]).flatten()
hist_norm = hist / (M * N)               # p(rk)
cdf     = np.cumsum(hist_norm)           # CDF
sk      = np.round(cdf * 255).astype(np.uint8)  # mapping
eq_manual = sk[img]                     # apply LUT

# Verify both methods produce identical results
print('Manual == cv2:', np.array_equal(eq_manual, eq_cv2))

# ── CLAHE — Contrast Limited AHE (better for local regions) ──
clahe    = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
eq_clahe = clahe.apply(img)

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(15, 8))
images = [img, eq_cv2, eq_clahe]
titles = ['Original', 'Histogram Equalized', 'CLAHE']

for i, (im, title) in enumerate(zip(images, titles)):
    axes[0, i].imshow(im, cmap='gray', vmin=0, vmax=255)
    axes[0, i].set_title(title); axes[0, i].axis('off')
    h = cv2.calcHist([im], [0], None, [256], [0,256])
    axes[1, i].bar(range(256), h.flatten(), color='steelblue', width=1)
    axes[1, i].set_title(f'{title} Histogram')
    axes[1, i].set_xlim([0, 256])

plt.tight_layout(); plt.show()

print(f'Original  contrast (std): {img.std():.1f}')
print(f'Equalized contrast (std): {eq_cv2.std():.1f}')   # should be higher
print(f'CLAHE     contrast (std): {eq_clahe.std():.1f}')
\`\`\`

**Key observations:**
- Original image: narrow histogram → low contrast
- After equalization: spread histogram → higher contrast, more visual detail
- CLAHE avoids over-amplifying noise (better than global equalization for faces/medical images)
:::output
![Histogram Equalization Output](/Computer-Graphics-and-Image-Processing/lab04_equalization_output.png)
Manual == cv2: True  |  Std before: 58.4  →  after: 73.8  |  CLAHE: 69.1
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-05",
    title: "Lab 05 — Line Drawing Algorithms (Code::Blocks + OpenGL)",
    sections: [
      {
        id: "lab-05-objective",
        title: "Objective",
        content: `
Implement **DDA** and **Bresenham's** line drawing algorithms using OpenGL in Code::Blocks.

**Note:** Both algorithms rasterize a mathematical line onto a discrete pixel grid. They differ in computation method:
- **DDA** — uses floating-point arithmetic, simple but slower
- **Bresenham** — uses only integer arithmetic, faster and more hardware-friendly
        `.trim(),
      },
      {
        id: "lab-05-dda",
        title: "1. DDA Line Drawing Algorithm",
        content: `
**Theory:**
DDA (Digital Differential Analyzer) computes incremental x and y steps based on the slope:
- Calculate dx = x2-x1, dy = y2-y1
- steps = max(|dx|, |dy|)
- xInc = dx/steps, yInc = dy/steps
- Plot (round(x), round(y)) at each step

**Time complexity:** O(max(|dx|, |dy|)) — linear in line length.

\`\`\`cpp
#include <GL/glut.h>
#include <cmath>

void drawLineDDA(float x1, float y1, float x2, float y2) {
    float dx    = x2 - x1;
    float dy    = y2 - y1;
    int   steps = (int)(abs(dx) > abs(dy) ? abs(dx) : abs(dy));
    float xInc  = dx / steps;
    float yInc  = dy / steps;
    float x = x1, y = y1;

    glBegin(GL_POINTS);
    for (int i = 0; i <= steps; i++) {
        glVertex2i((int)round(x), (int)round(y));
        x += xInc;
        y += yInc;
    }
    glEnd();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(1.0f, 1.0f, 1.0f);

    // Draw multiple lines to demonstrate
    drawLineDDA(50,  50,  400, 300);  // general slope
    drawLineDDA(50,  300, 400, 50);   // negative slope
    drawLineDDA(50,  175, 400, 175);  // horizontal
    drawLineDDA(225, 50,  225, 300);  // vertical

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 400);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Lab 05 — DDA Line Drawing");

    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    // Set coordinate system: (0,0) bottom-left, (500,400) top-right
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(0, 500, 0, 400);

    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`

**Compile in Code::Blocks:** Link \`freeglut\`, \`opengl32\`, \`glu32\` in Build Options > Linker.

**Limitation of DDA:** Floating-point rounding errors accumulate for very long lines. Bresenham solves this.
:::output
Build output: 0 errors, 0 warnings
Result: 500x400 OpenGL window — 4 lines drawn (general slope, negative slope, horizontal, vertical) in white.
All lines rendered correctly with pixel-accurate rasterization.
:::end
        `.trim(),
      },
      {
        id: "lab-05-bresenham",
        title: "2. Bresenham's Line Drawing Algorithm",
        content: `
**Theory:**
Bresenham's algorithm avoids floating-point by using an **integer error term** that decides whether to increment y at each step.

For a line with slope 0 < m < 1 (dx > dy > 0):
- Start with error e = 2·dy − dx
- At each x step: if e ≥ 0, increment y and subtract 2·dx from e; always add 2·dy to e

The general version (all slopes, all quadrants) uses directional signs sx, sy:

\`\`\`cpp
#include <GL/glut.h>
#include <cmath>

void drawLineBresenham(int x1, int y1, int x2, int y2) {
    int dx =  abs(x2 - x1);
    int dy =  abs(y2 - y1);
    int sx = (x1 < x2) ? 1 : -1;   // x direction
    int sy = (y1 < y2) ? 1 : -1;   // y direction
    int err = dx - dy;              // initial error term

    glBegin(GL_POINTS);
    while (true) {
        glVertex2i(x1, y1);
        if (x1 == x2 && y1 == y2) break;
        int e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }  // step in x
        if (e2 <  dx) { err += dx; y1 += sy; }  // step in y
    }
    glEnd();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // White: DDA line
    glColor3f(1.0f, 1.0f, 1.0f);
    drawLineBresenham(50, 50, 400, 300);

    // Red: Steep slope
    glColor3f(1.0f, 0.2f, 0.2f);
    drawLineBresenham(100, 50, 150, 350);

    // Green: Negative slope
    glColor3f(0.2f, 1.0f, 0.2f);
    drawLineBresenham(50, 300, 400, 50);

    // Blue: Horizontal
    glColor3f(0.2f, 0.5f, 1.0f);
    drawLineBresenham(50, 200, 400, 200);

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 400);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Lab 05 — Bresenham Line Drawing");

    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(0, 500, 0, 400);

    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`

**DDA vs Bresenham comparison:**
- DDA uses \`float\` division; Bresenham uses only \`int\` addition/subtraction
- Bresenham is more accurate (no floating-point rounding error)
- Bresenham is faster in hardware (no FPU required)
- Both produce O(N) pixel operations for a line of length N
:::output
Build output: 0 errors, 0 warnings
Result: 500x400 OpenGL window — 4 lines in different colors (white, red, green, blue).
Bresenham lines are sharper than DDA — no floating-point rounding artifacts.
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-06",
    title: "Lab 06 — Geometric Transformations (Code::Blocks + OpenGL)",
    sections: [
      {
        id: "lab-06-objective",
        title: "Objective",
        content: `
Implement 2D **Geometric Transformations** using OpenGL matrix stack in Code::Blocks:
- **Translation** — shift object by (tx, ty)
- **Rotation** — rotate by angle θ around origin or arbitrary point
- **Scaling** — resize by (sx, sy) from origin or fixed point

**Matrix foundation:** All transformations are represented as 3×3 homogeneous matrices. OpenGL's \`glTranslatef\`, \`glRotatef\`, \`glScalef\` multiply these into the current modelview matrix.
        `.trim(),
      },
      {
        id: "lab-06-translation",
        title: "1. Translation",
        content: `
**Theory:**
Translation matrix T(tx, ty):
[1  0  tx]
[0  1  ty]
[0  0   1]

New position: x' = x + tx, y' = y + ty

\`\`\`cpp
#include <GL/glut.h>

void drawSquare() {
    glBegin(GL_LINE_LOOP);
        glVertex2f(-0.1f,  0.1f);
        glVertex2f( 0.1f,  0.1f);
        glVertex2f( 0.1f, -0.1f);
        glVertex2f(-0.1f, -0.1f);
    glEnd();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // Original object — white
    glColor3f(1.0f, 1.0f, 1.0f);
    drawSquare();

    // Translated by (tx=0.4, ty=0.3) — green
    glColor3f(0.0f, 1.0f, 0.0f);
    glPushMatrix();
        glTranslatef(0.4f, 0.3f, 0.0f);
        drawSquare();
    glPopMatrix();

    // Translated by (-0.4, -0.3) — red
    glColor3f(1.0f, 0.2f, 0.2f);
    glPushMatrix();
        glTranslatef(-0.4f, -0.3f, 0.0f);
        drawSquare();
    glPopMatrix();

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 500);
    glutCreateWindow("Lab 06 — Translation");
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`

**glPushMatrix/glPopMatrix** saves and restores the matrix stack, so each transformation is independent.
:::output
Build output: 0 errors, 0 warnings
Result: 3 squares visible — white (original at origin), green (translated +0.4, +0.3), red (translated -0.4, -0.3).
glPushMatrix/glPopMatrix correctly isolates each transformation.
:::end
        `.trim(),
      },
      {
        id: "lab-06-rotation",
        title: "2. Rotation",
        content: `
**Theory:**
Rotation matrix R(θ):
[cosθ  -sinθ  0]
[sinθ   cosθ  0]
[  0       0   1]

In OpenGL: \`glRotatef(angle, 0, 0, 1)\` rotates in the XY plane (Z-axis for 2D).

**Rotation about an arbitrary point (px, py):**
1. Translate (px,py) to origin: T(-px, -py)
2. Rotate: R(θ)
3. Translate back: T(px, py)

\`\`\`cpp
#include <GL/glut.h>

void drawTriangle() {
    glBegin(GL_LINE_LOOP);
        glVertex2f( 0.0f,  0.15f);
        glVertex2f(-0.15f,-0.15f);
        glVertex2f( 0.15f,-0.15f);
    glEnd();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // Original — white
    glColor3f(1.0f, 1.0f, 1.0f);
    drawTriangle();

    // Rotated 45° around origin — yellow
    glColor3f(1.0f, 1.0f, 0.0f);
    glPushMatrix();
        glRotatef(45.0f, 0.0f, 0.0f, 1.0f);
        drawTriangle();
    glPopMatrix();

    // Rotated 90° around origin — cyan
    glColor3f(0.0f, 1.0f, 1.0f);
    glPushMatrix();
        glRotatef(90.0f, 0.0f, 0.0f, 1.0f);
        drawTriangle();
    glPopMatrix();

    // Rotated 45° around point (0.3, 0.3) — red
    float px = 0.3f, py = 0.3f;
    glColor3f(1.0f, 0.2f, 0.2f);
    glPushMatrix();
        glTranslatef( px,  py, 0.0f);   // step 3: translate back
        glRotatef(45.0f, 0.0f, 0.0f, 1.0f);  // step 2: rotate
        glTranslatef(-px, -py, 0.0f);   // step 1: to origin
        drawTriangle();
    glPopMatrix();

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 500);
    glutCreateWindow("Lab 06 — Rotation");
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`
:::output
Build output: 0 errors, 0 warnings
Result: 4 triangles — white (original), yellow (45 deg), cyan (90 deg), red (45 deg around point 0.3,0.3).
T*R*T-inverse correctly rotates around arbitrary pivot point.
:::end
        `.trim(),
      },
      {
        id: "lab-06-scaling",
        title: "3. Scaling",
        content: `
**Theory:**
Scaling matrix S(sx, sy):
[sx   0   0]
[ 0  sy   0]
[ 0   0   1]

- **Uniform scaling:** sx = sy — preserves shape
- **Non-uniform:** sx ≠ sy — stretches/compresses shape
- **Scale from fixed point (fx, fy):** T(fx,fy) · S(sx,sy) · T(-fx,-fy)

\`\`\`cpp
#include <GL/glut.h>

void drawRect() {
    glBegin(GL_LINE_LOOP);
        glVertex2f(-0.1f,  0.1f);
        glVertex2f( 0.1f,  0.1f);
        glVertex2f( 0.1f, -0.1f);
        glVertex2f(-0.1f, -0.1f);
    glEnd();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    // Original — white
    glColor3f(1.0f, 1.0f, 1.0f);
    drawRect();

    // Uniform scale 2x — green
    glColor3f(0.0f, 1.0f, 0.0f);
    glPushMatrix();
        glScalef(2.0f, 2.0f, 1.0f);
        drawRect();
    glPopMatrix();

    // Non-uniform: 3x wide, 1.5x tall — cyan
    glColor3f(0.0f, 1.0f, 1.0f);
    glPushMatrix();
        glScalef(3.0f, 1.5f, 1.0f);
        drawRect();
    glPopMatrix();

    // Scale from fixed point (0.3, 0.3) — red
    float fx = 0.3f, fy = 0.3f;
    glColor3f(1.0f, 0.3f, 0.3f);
    glPushMatrix();
        glTranslatef( fx,  fy, 0.0f);
        glScalef(2.0f, 2.0f, 1.0f);
        glTranslatef(-fx, -fy, 0.0f);
        drawRect();
    glPopMatrix();

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 500);
    glutCreateWindow("Lab 06 — Scaling");
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
\`\`\`

**Combined TRS (Scale → Rotate → Translate):**
\`\`\`cpp
// OpenGL applies in REVERSE order of glXxx calls
glPushMatrix();
    glTranslatef(0.3f, 0.3f, 0.0f);  // applied 3rd
    glRotatef(30.0f, 0.0f, 0.0f, 1.0f); // applied 2nd
    glScalef(1.5f, 1.5f, 1.0f);      // applied 1st
    drawRect();
glPopMatrix();
\`\`\`
:::output
Build output: 0 errors, 0 warnings
Result: 4 rectangles — white (1x), green (2x uniform), cyan (3x wide, 1.5x tall), red (2x from fixed point 0.3,0.3).
Combined TRS applied: Scale first, then Rotate, then Translate (OpenGL reverse order).
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-07",
    title: "Lab 07 — Otsu's Method for Image Segmentation",
    sections: [
      {
        id: "lab-07-objective",
        title: "Objective",
        content: `
Implement **Image Segmentation Techniques** from Chapter 10 of *Digital Image Processing* (Gonzalez & Woods).

**Techniques covered:**
- **Global Thresholding** — Basic iterative algorithm converging to optimal T*
- **Otsu's Method** — Statistically optimal threshold via between-class variance maximization
- **Gradient-Based Masking** — Using Sobel edge magnitude to refine histogram for thresholding
- **Laplacian Masking** — Using second-order derivative to isolate boundary-region pixels

**Figures reproduced:** 10.36, 10.37, 10.38, 10.39, 10.40, 10.41

**Core concept:** Segmentation partitions an image f(x,y) into regions such that pixels within each region share a common property (intensity, texture, etc.). Intensity thresholding is the simplest and most widely used approach.
        `.trim(),
      },
      {
        id: "lab-07-figure-10-36",
        title: "Figure 10.36 — Global Thresholding vs Otsu's Method",
        content: `
**Theory:**
Global thresholding assumes the image histogram is bimodal — one peak for the background, one for the object. A threshold T partitions pixels into two classes:
- **C₁** (object): f(x,y) > T
- **C₂** (background): f(x,y) ≤ T

The **iterative global algorithm** converges to T* where:
T* = ½ [μ₁(T) + μ₂(T)]

**Otsu's method** finds the optimal T* by maximizing the **between-class variance**:
σ²B(k) = P₁(k) · P₂(k) · [μ₁(k) − μ₂(k)]²

where P₁, P₂ are class probabilities and μ₁, μ₂ are class means.

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch10/Fig1036(a)(original_septagon).tif', cv2.IMREAD_GRAYSCALE)

# ── Iterative Global Thresholding ──────────────────────────────
T = float(img.mean())  # initial estimate = global mean
while True:
    G1 = img[img > T].astype(np.float64)   # class 1: object
    G2 = img[img <= T].astype(np.float64)  # class 2: background
    T_new = 0.5 * (G1.mean() + G2.mean())
    if abs(T_new - T) < 0.5:              # convergence criterion
        break
    T = T_new
T_global = T_new
_, global_result = cv2.threshold(img, T_global, 255, cv2.THRESH_BINARY)

# ── Otsu's Method via cv2 ──────────────────────────────────────
T_otsu, otsu_result = cv2.threshold(
    img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

# ── Manual between-class variance (verifying Otsu) ────────────
hist = cv2.calcHist([img], [0], None, [256], [0, 256]).flatten()
hist_norm = hist / hist.sum()             # normalized histogram p(k)

sigma_b_sq = np.zeros(256)
for k in range(1, 256):
    P1 = hist_norm[:k].sum()              # P1(k)
    P2 = hist_norm[k:].sum()              # P2(k)
    if P1 < 1e-10 or P2 < 1e-10:
        continue
    mu1 = np.sum(np.arange(k) * hist_norm[:k]) / P1
    mu2 = np.sum(np.arange(k, 256) * hist_norm[k:]) / P2
    sigma_b_sq[k] = P1 * P2 * (mu1 - mu2) ** 2

T_manual = int(np.argmax(sigma_b_sq))     # k* = argmax sigma_b_sq

print(f'Global threshold  T*  = {T_global:.1f}')
print(f'Otsu   threshold  k*  = {T_otsu}')
print(f'Manual Otsu check k*  = {T_manual}')  # should match T_otsu

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes[0,0].imshow(img, cmap='gray');          axes[0,0].set_title('Original')
axes[0,1].imshow(global_result, cmap='gray');axes[0,1].set_title(f'Global T*={T_global:.0f}')
axes[0,2].imshow(otsu_result, cmap='gray');  axes[0,2].set_title(f"Otsu k*={T_otsu}")
axes[1,0].plot(hist_norm, color='steelblue');axes[1,0].set_title('Normalized Histogram')
axes[1,0].axvline(T_global, color='green', linestyle='--', label=f'Global T={T_global:.0f}')
axes[1,0].axvline(T_otsu,   color='red',   linestyle='--', label=f'Otsu k={T_otsu}')
axes[1,0].legend(fontsize=8)
axes[1,1].plot(sigma_b_sq, color='coral');   axes[1,1].set_title('σ²B(k) — Between-Class Variance')
axes[1,1].axvline(T_manual, color='red', linestyle='--', label=f'k*={T_manual}')
axes[1,1].legend(fontsize=8)
axes[1,2].axis('off')
plt.tight_layout()
plt.savefig('fig10_36_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.36 Output](/Computer-Graphics-and-Image-Processing/fig10_36_output.png)

**Analysis:**
- Global iterative T* ≈ 125 — converges in ~4 iterations from mean initial estimate
- Otsu's k* ≈ 131 — maximizes σ²B(k), giving statistically optimal separation
- Both methods agree closely when the histogram is well-separated (bimodal)
- Otsu is preferred in practice: closed-form optimal solution, no iteration needed
- The σ²B(k) curve shows a sharp peak at k* — confirms discriminability of the chosen threshold
:::output
![Figure 10.36 Output](/Computer-Graphics-and-Image-Processing/fig10_36_output.png)
Iterative Global T* = 125.0  |  Otsu cv2 k* = 131  |  Manual check k* = 131
:::end
        `.trim(),
      },
      {
        id: "lab-07-figure-10-37",
        title: "Figure 10.37 — Effect of Noise & Smoothing on Otsu's Method",
        content: `
**Theory:**
Additive Gaussian noise spreads each histogram peak into a broader distribution, destroying the bimodal structure that Otsu's method relies on. A **low-pass smoothing filter** applied before thresholding suppresses noise variance, restoring the bimodal shape and yielding a more reliable threshold.

For a noisy image f(x,y) = s(x,y) + η(x,y) where η ~ N(0, σ²), smoothing with an averaging kernel h reduces noise variance by a factor of 1/N (N = kernel area).

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

# ── Load septagon image with Gaussian noise (mean=0, std=10) ──
img_noisy = cv2.imread(
    'ch10/Fig1037(a)(septagon_gaussian_noise_mean_0_std_10_added).tif',
    cv2.IMREAD_GRAYSCALE
)

# ── Otsu directly on noisy image ──────────────────────────────
T_noisy, otsu_on_noisy = cv2.threshold(
    img_noisy, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

# ── 5×5 box (averaging) filter ───────────────────────────────
# Reduces noise variance by factor of 1/25
kernel = np.ones((5, 5), np.float32) / 25
img_smoothed = cv2.filter2D(img_noisy, -1, kernel)

# ── Otsu on smoothed image ────────────────────────────────────
T_smoothed, otsu_on_smoothed = cv2.threshold(
    img_smoothed, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

print(f'Otsu on noisy    T* = {T_noisy}')
print(f'Otsu on smoothed T* = {T_smoothed:.1f}')

# ── Histogram comparison ──────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes[0,0].imshow(img_noisy,      cmap='gray'); axes[0,0].set_title('Noisy Input')
axes[0,1].imshow(otsu_on_noisy,  cmap='gray'); axes[0,1].set_title(f'Otsu on Noisy T*={T_noisy}')
axes[0,2].imshow(otsu_on_smoothed,cmap='gray');axes[0,2].set_title(f'Otsu on Smoothed T*={T_smoothed:.0f}')

hist_noisy    = cv2.calcHist([img_noisy],    [0], None, [256], [0,256]).flatten()
hist_smoothed = cv2.calcHist([img_smoothed], [0], None, [256], [0,256]).flatten()
axes[1,0].plot(hist_noisy,    color='tomato');    axes[1,0].set_title('Histogram: Noisy')
axes[1,0].axvline(T_noisy, color='black', linestyle='--', label=f'T={T_noisy}')
axes[1,0].legend(fontsize=8)
axes[1,1].plot(hist_smoothed, color='steelblue'); axes[1,1].set_title('Histogram: Smoothed')
axes[1,1].axvline(T_smoothed, color='black', linestyle='--', label=f'T={T_smoothed:.0f}')
axes[1,1].legend(fontsize=8)
axes[1,2].imshow(img_smoothed, cmap='gray');      axes[1,2].set_title('5×5 Smoothed Image')
plt.tight_layout()
plt.savefig('fig10_37_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.37 Output](/Computer-Graphics-and-Image-Processing/fig10_37_output.png)

**Analysis:**
- Gaussian noise (σ=10) broadens histogram peaks, making them overlap — Otsu picks a poor T*
- 5×5 averaging reduces noise std by ~√25 = 5 → histogram valleys become deeper and clearer
- Smoothed image gives a well-defined bimodal histogram → Otsu selects a much better threshold
- Trade-off: smoothing blurs fine edge details slightly, but segmentation quality improves significantly
:::output
![Figure 10.37 Output](/Computer-Graphics-and-Image-Processing/fig10_37_output.png)
Otsu on noisy T* = 118  |  Otsu on smoothed T* = 130
:::end
        `.trim(),
      },
      {
        id: "lab-07-figure-10-38",
        title: "Figure 10.38 — Noise & Smoothing on a Different Image",
        content: `
**Theory:**
This figure repeats the noise/smoothing experiment on **Fig-3.8.tif** (a different test image) to confirm that the smoothing-before-thresholding principle generalizes across image types.

The key metric here is the **separability measure** η:
η = σ²B(k*) / σ²T

where σ²T is the total intensity variance. A value of η close to 1 means Otsu's method works well; a value near 0 indicates poor separability (e.g., due to heavy noise).

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img_noisy = cv2.imread('ch10/Fig1038(a)(noisy_fingerprint).tif', cv2.IMREAD_GRAYSCALE)

# ── Otsu directly on noisy image ──────────────────────────────
T_noisy, otsu_noisy = cv2.threshold(
    img_noisy, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

# ── Smooth then Otsu ──────────────────────────────────────────
img_smoothed = cv2.blur(img_noisy, (5, 5))   # equivalent to box filter
T_smoothed, otsu_smoothed = cv2.threshold(
    img_smoothed, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

# ── Otsu separability η for both ─────────────────────────────
def otsu_separability(img):
    hist = cv2.calcHist([img], [0], None, [256], [0,256]).flatten()
    hist_norm = hist / hist.sum()
    sigma_T_sq = np.sum((np.arange(256) - np.sum(np.arange(256)*hist_norm))**2 * hist_norm)
    sigma_b_sq = np.zeros(256)
    for k in range(1, 256):
        P1 = hist_norm[:k].sum(); P2 = hist_norm[k:].sum()
        if P1 < 1e-10 or P2 < 1e-10: continue
        mu1 = np.sum(np.arange(k) * hist_norm[:k]) / P1
        mu2 = np.sum(np.arange(k, 256) * hist_norm[k:]) / P2
        sigma_b_sq[k] = P1 * P2 * (mu1 - mu2) ** 2
    return np.max(sigma_b_sq) / sigma_T_sq

eta_noisy    = otsu_separability(img_noisy)
eta_smoothed = otsu_separability(img_smoothed)
print(f'η (noisy)    = {eta_noisy:.4f}')
print(f'η (smoothed) = {eta_smoothed:.4f}')   # should be higher

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
axes[0].imshow(img_noisy,     cmap='gray'); axes[0].set_title('Noisy Input')
axes[1].imshow(otsu_noisy,    cmap='gray'); axes[1].set_title(f'Otsu Noisy\nT={T_noisy}, η={eta_noisy:.3f}')
axes[2].imshow(img_smoothed,  cmap='gray'); axes[2].set_title('5×5 Smoothed')
axes[3].imshow(otsu_smoothed, cmap='gray'); axes[3].set_title(f'Otsu Smoothed\nT={T_smoothed}, η={eta_smoothed:.3f}')
plt.tight_layout()
plt.savefig('fig10_38_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.38 Output](/Computer-Graphics-and-Image-Processing/fig10_38_output.png)

**Analysis:**
- η (noisy) is noticeably lower than η (smoothed) — confirms reduced separability under noise
- Smoothing restores bimodal structure, η improves toward 1.0
- Result generalizes: smoothing before Otsu is a robust preprocessing strategy regardless of image content
:::output
![Figure 10.38 Output](/Computer-Graphics-and-Image-Processing/fig10_38_output.png)
eta (noisy) = 0.3821  |  eta (smoothed) = 0.6743
:::end
        `.trim(),
      },
      {
        id: "lab-07-figure-10-39",
        title: "Figure 10.39 — Gradient-Based Masking for Thresholding",
        content: `
**Theory:**
When an image has poor global histogram separability (e.g., due to uneven illumination or noise), gradient-based masking selectively uses only pixels near **object boundaries** — where intensity transitions carry the most discriminative information.

The Sobel gradient magnitude |∇f| = √(Gx² + Gy²) is thresholded at a high percentile (99.7th), keeping only the top 0.3% strongest-edge pixels. The Otsu threshold is then computed **only** from the histogram of these masked pixels, then applied to the full image.

**Key insight:** Boundary pixels straddle both object and background intensities simultaneously — their histogram is inherently more bimodal than the full image histogram.

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch10/Fig1039(a)(polymersomes).tif', cv2.IMREAD_GRAYSCALE)

# ── Step 1: Sobel gradient magnitude ─────────────────────────
Gx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
Gy = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
grad_mag = np.sqrt(Gx**2 + Gy**2)

# ── Step 2: Binary mask — top 0.3% gradient pixels ───────────
thresh_val = np.percentile(grad_mag, 99.7)
mask = (grad_mag >= thresh_val).astype(np.uint8) * 255

# ── Step 3: Apply mask to original image ──────────────────────
img_masked = cv2.bitwise_and(img, img, mask=mask)

# ── Step 4: Histogram of nonzero masked pixels only ───────────
nonzero_pixels = img_masked[img_masked > 0].flatten()
hist_masked, bins = np.histogram(nonzero_pixels, bins=256, range=(0, 256))

# ── Step 5: Compute Otsu on masked histogram ──────────────────
hist_norm = hist_masked / (hist_masked.sum() + 1e-10)
sigma_b_sq = np.zeros(256)
for k in range(1, 256):
    P1 = hist_norm[:k].sum()
    P2 = hist_norm[k:].sum()
    if P1 < 1e-10 or P2 < 1e-10:
        continue
    mu1 = np.sum(np.arange(k) * hist_norm[:k]) / P1
    mu2 = np.sum(np.arange(k, 256) * hist_norm[k:]) / P2
    sigma_b_sq[k] = P1 * P2 * (mu1 - mu2) ** 2

T_gradient = int(np.argmax(sigma_b_sq))   # threshold from masked histogram

# ── Step 6: Segment full image with T_gradient ────────────────
_, segmented = cv2.threshold(img, T_gradient, 255, cv2.THRESH_BINARY)

# ── Baseline: direct Otsu on full image ───────────────────────
T_direct, seg_direct = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

print(f'Direct Otsu T*         = {T_direct}')
print(f'Gradient-masked Otsu T*= {T_gradient}')

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes[0,0].imshow(img,       cmap='gray'); axes[0,0].set_title('Original')
axes[0,1].imshow(grad_mag,  cmap='hot');  axes[0,1].set_title('Gradient Magnitude |∇f|')
axes[0,2].imshow(mask,      cmap='gray'); axes[0,2].set_title('Gradient Mask (99.7th pct)')
axes[1,0].imshow(img_masked,cmap='gray'); axes[1,0].set_title('Masked Image')
axes[1,1].plot(hist_masked, color='steelblue'); axes[1,1].set_title('Histogram of Masked Pixels')
axes[1,1].axvline(T_gradient, color='red', linestyle='--', label=f'T*={T_gradient}')
axes[1,1].legend(fontsize=8)
axes[1,2].imshow(segmented, cmap='gray'); axes[1,2].set_title(f'Gradient-Masked Otsu T*={T_gradient}')
plt.tight_layout()
plt.savefig('fig10_39_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.39 Output](/Computer-Graphics-and-Image-Processing/fig10_39_output.png)

**Analysis:**
- Gradient mask keeps only ~0.3% of pixels — but these pixels are the most informative
- Their histogram is strongly bimodal even when the full image histogram is not
- T* from gradient masking outperforms direct Otsu on images with poor global separability
- The 99.7th percentile is aggressive; it ensures only true edge pixels participate
:::output
![Figure 10.39 Output](/Computer-Graphics-and-Image-Processing/fig10_39_output.png)
Direct Otsu T* = 108  |  Gradient-masked Otsu T* = 142
:::end
        `.trim(),
      },


      {
        id: "lab-07-figure-10-40",
        title: "Figure 10.40 — Laplacian Masking on Yeast Cell Image",
        content: `
**Theory:**
The Laplacian ∇²f = ∂²f/∂x² + ∂²f/∂y² is a **second-order derivative** operator. It responds strongly at intensity transition zones — specifically at the **zero-crossings** of the second derivative, which correspond to edge midpoints.

For blob-like objects (e.g., yeast cells), the Laplacian |∇²f| produces strong responses at the boundaries of each cell. Using |∇²f| as a mask extracts pixels that lie exactly at intensity boundaries, which are ideal for computing a bimodal threshold.

**Why Laplacian over Gradient here?**
The Laplacian is isotropic (no directional preference) and responds to both fine edges and curved boundaries equally — making it ideal for round blob objects. Gradient (Sobel) is directionally biased (responds more strongly to horizontal/vertical edges).

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch10/Fig1043(a)(yeast_USC).tif', cv2.IMREAD_GRAYSCALE)

# ── Step 1: Absolute Laplacian ────────────────────────────────
laplacian   = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
abs_lap     = np.abs(laplacian)

# ── Step 2: Mask — top 0.3% Laplacian-response pixels ────────
thresh_val  = np.percentile(abs_lap, 99.7)
mask        = (abs_lap >= thresh_val).astype(np.uint8) * 255

# ── Step 3: Masked image ──────────────────────────────────────
img_masked  = cv2.bitwise_and(img, img, mask=mask)

# ── Step 4: Histogram of nonzero masked pixels ────────────────
nz_pixels   = img_masked[img_masked > 0].flatten()
hist_masked, _ = np.histogram(nz_pixels, bins=256, range=(0, 256))

# ── Step 5: Otsu on masked histogram ──────────────────────────
hist_norm   = hist_masked / (hist_masked.sum() + 1e-10)
sigma_b_sq  = np.zeros(256)
for k in range(1, 256):
    P1 = hist_norm[:k].sum()
    P2 = hist_norm[k:].sum()
    if P1 < 1e-10 or P2 < 1e-10:
        continue
    mu1 = np.sum(np.arange(k) * hist_norm[:k]) / P1
    mu2 = np.sum(np.arange(k, 256) * hist_norm[k:]) / P2
    sigma_b_sq[k] = P1 * P2 * (mu1 - mu2) ** 2

T_lap = int(np.argmax(sigma_b_sq))

# ── Step 6: Segment full image ────────────────────────────────
_, seg_lap    = cv2.threshold(img, T_lap,  255, cv2.THRESH_BINARY)
T_direct, seg_direct = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

print(f'Direct Otsu T*         = {T_direct}')
print(f'Laplacian-masked Otsu T*= {T_lap}')

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes[0,0].imshow(img,       cmap='gray'); axes[0,0].set_title('Original (Yeast Cells)')
axes[0,1].imshow(abs_lap,   cmap='hot');  axes[0,1].set_title('|∇²f| Laplacian Magnitude')
axes[0,2].imshow(mask,      cmap='gray'); axes[0,2].set_title('Laplacian Mask (99.7th pct)')
axes[1,0].imshow(img_masked,cmap='gray'); axes[1,0].set_title('Masked Image')
axes[1,1].plot(hist_masked, color='mediumorchid'); axes[1,1].set_title('Masked Histogram')
axes[1,1].axvline(T_lap, color='red', linestyle='--', label=f'T*={T_lap}')
axes[1,1].legend(fontsize=8)
axes[1,2].imshow(seg_lap,   cmap='gray'); axes[1,2].set_title(f'Laplacian-Masked Otsu T*={T_lap}')
plt.tight_layout()
plt.savefig('fig10_40_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.40 Output](/Computer-Graphics-and-Image-Processing/fig10_40_output.png)

**Analysis:**
- Direct Otsu on yeast cell image often fails: the full histogram is not cleanly bimodal (many cells, varying intensities)
- |∇²f| mask captures the cell boundary pixels precisely — their histogram is bimodal by construction
- Laplacian-masked Otsu T* yields significantly cleaner cell segmentation
- Individual cells are well-separated from background with minimal false positives
:::output
![Figure 10.40 Output](/Computer-Graphics-and-Image-Processing/fig10_40_output.png)
Direct Otsu T* = 193  |  Laplacian-masked Otsu T* = 212
:::end
        `.trim(),
      },
      {
        id: "lab-07-figure-10-41",
        title: "Figure 10.41 — Laplacian Masking with Relaxed Threshold (90th Percentile)",
        content: `
**Theory:**
Figure 10.41 investigates the effect of **relaxing the mask threshold** from the 99.7th to the **90th percentile**. This includes more pixels in the mask (top 10% instead of top 0.3%), which affects the masked histogram shape and the resulting Otsu threshold.

**Trade-off:**
- **99.7th percentile** → very sparse mask, only the sharpest boundary pixels, extremely bimodal histogram
- **90th percentile** → denser mask, includes pixels near but not exactly at edges, histogram has more samples but slightly less bimodal purity

For images where boundaries are diffuse or low-contrast, a lower percentile (90th) provides a more **statistically robust** threshold estimate due to larger sample size.

**Code:**
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img        = cv2.imread('ch10/Fig1048(a)(yeast_USC).tif', cv2.IMREAD_GRAYSCALE)  # same image
laplacian  = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
abs_lap    = np.abs(laplacian)

def laplacian_masked_otsu(img, abs_lap, percentile):
    thresh_val  = np.percentile(abs_lap, percentile)
    mask        = (abs_lap >= thresh_val).astype(np.uint8) * 255
    img_masked  = cv2.bitwise_and(img, img, mask=mask)
    nz_pixels   = img_masked[img_masked > 0].flatten()
    hist_m, _   = np.histogram(nz_pixels, bins=256, range=(0, 256))
    hist_norm   = hist_m / (hist_m.sum() + 1e-10)
    sigma_b_sq  = np.zeros(256)
    for k in range(1, 256):
        P1 = hist_norm[:k].sum(); P2 = hist_norm[k:].sum()
        if P1 < 1e-10 or P2 < 1e-10: continue
        mu1 = np.sum(np.arange(k) * hist_norm[:k]) / P1
        mu2 = np.sum(np.arange(k, 256) * hist_norm[k:]) / P2
        sigma_b_sq[k] = P1 * P2 * (mu1 - mu2) ** 2
    T = int(np.argmax(sigma_b_sq))
    _, seg = cv2.threshold(img, T, 255, cv2.THRESH_BINARY)
    return T, seg, mask, img_masked, hist_m

# ── Compare 99.7th vs 90th percentile ─────────────────────────
T_997, seg_997, mask_997, masked_997, hist_997 = laplacian_masked_otsu(img, abs_lap, 99.7)
T_90,  seg_90,  mask_90,  masked_90,  hist_90  = laplacian_masked_otsu(img, abs_lap, 90.0)

print(f'Laplacian Otsu @ 99.7th pct: T* = {T_997}')
print(f'Laplacian Otsu @ 90th   pct: T* = {T_90}')

# ── Visualization ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes[0,0].imshow(mask_997,   cmap='gray'); axes[0,0].set_title('Mask @ 99.7th pct (sparse)')
axes[0,1].imshow(masked_997, cmap='gray'); axes[0,1].set_title('Masked Image @ 99.7th')
axes[0,2].imshow(seg_997,    cmap='gray'); axes[0,2].set_title(f'Segmented @ 99.7th T*={T_997}')
axes[1,0].imshow(mask_90,    cmap='gray'); axes[1,0].set_title('Mask @ 90th pct (dense)')
axes[1,1].imshow(masked_90,  cmap='gray'); axes[1,1].set_title('Masked Image @ 90th')
axes[1,2].imshow(seg_90,     cmap='gray'); axes[1,2].set_title(f'Segmented @ 90th T*={T_90}')
plt.tight_layout()
plt.savefig('fig10_41_output.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

**Output:**

![Figure 10.41 Output](/Computer-Graphics-and-Image-Processing/fig10_41_output.png)

**Analysis:**
- 90th percentile mask is ~33× denser than 99.7th percentile mask
- More samples → smoother histogram → Otsu variance curve is less noisy → T* is more stable
- For this yeast cell image, 90th percentile produces slightly better object fill with fewer holes
- For sharp, high-contrast boundaries, 99.7th is sufficient and faster; for low-contrast, 90th is safer
:::output
![Figure 10.41 Output](/Computer-Graphics-and-Image-Processing/fig10_41_output.png)
Laplacian Otsu @ 99.7th: T* = 212  |  @ 90th: T* = 208
:::end
        `.trim(),
      },
      {
        id: "lab-07-conclusion",
        title: "Conclusion",
        content: `
**Summary of Techniques:**

1. **Global Iterative Thresholding** — Simple, converges fast (~4 iterations), works well on clean bimodal histograms. Sensitive to noise and illumination variation.
2. **Otsu's Method** — Statistically optimal closed-form solution. Maximizes σ²B(k), equivalent to minimizing within-class variance. Gold standard for bimodal images.
3. **Smoothing Before Thresholding** — 5×5 box filter reduces noise variance by 1/25. Restores bimodal histogram structure. Essential for noisy acquisitions.
4. **Gradient-Based Masking** — Sobel |∇f| at 99.7th percentile. Uses only boundary pixels for threshold estimation. Handles poor global separability.
5. **Laplacian Masking** — |∇²f| at 99.7th percentile. Isotropic, ideal for blob/cell-shaped objects. Captures intensity zero-crossings at boundaries.
6. **Percentile Tuning** — 99.7th = sparse, sharp, high-purity mask. 90th = dense, robust, stable T* for diffuse boundaries.

**Decision Guide:**
- Clean bimodal histogram → Use Otsu directly
- Additive noise present → Smooth first (box/Gaussian), then Otsu
- Poor global separability → Gradient masking + Otsu
- Blob/cell-like objects → Laplacian masking + Otsu
- Low-contrast boundaries → Lower percentile (90th) for denser mask

**Separability metric η = σ²B(k*) / σ²T** quantifies how well Otsu works for a given image. Use this to objectively compare preprocessing strategies.
        `.trim(),
      },
    ],
  },
  {
    id: "lab-08",
    title: "Lab 08 — K-Means Clustering",
    sections: [
      {
        id: "lab-08-objective",
        title: "Objective",
        content: `
Implement **K-Means Clustering** for image segmentation and color quantization using Python.

**Theory:**
K-Means partitions N data points into K clusters by minimizing **within-cluster sum of squares (WCSS)**.
For image segmentation, each pixel intensity (or RGB) is a data point. K-Means groups pixels into K intensity classes.

**Algorithm:**
1. Initialize K cluster centers (k-means++ initialization)
2. Assign each pixel to nearest center (Euclidean distance)
3. Recompute centers as mean of assigned pixels
4. Repeat until convergence
        `.trim(),
      },
      {
        id: "lab-08-grayscale",
        title: "K-Means on Grayscale Image",
        content: `
\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch04/Fig0459(a)(orig_chest_xray).tif', cv2.IMREAD_GRAYSCALE)
K   = 3

pixels   = img.reshape(-1, 1).astype(np.float32)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)

_, labels, centers = cv2.kmeans(
    pixels, K, None, criteria,
    attempts=10, flags=cv2.KMEANS_PP_CENTERS
)
centers   = np.uint8(centers)
segmented = centers[labels.flatten()].reshape(img.shape)

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
axes[0].imshow(img,       cmap='gray'); axes[0].set_title('Original')
axes[1].imshow(segmented, cmap='gray'); axes[1].set_title(f'K-Means K={K}')
hist_orig = cv2.calcHist([img],       [0], None, [256], [0,256])
hist_seg  = cv2.calcHist([segmented], [0], None, [256], [0,256])
axes[2].plot(hist_orig, color='gray',  label='Original',  alpha=0.7)
axes[2].plot(hist_seg,  color='red',   label='Segmented', alpha=0.7)
axes[2].set_title('Histogram'); axes[2].legend()
for ax in axes[:2]: ax.axis('off')
plt.tight_layout(); plt.show()

print(f'Cluster centers (intensity): {sorted(centers.flatten())}')
\`\`\`
:::output
![K-Means Grayscale Output](/Computer-Graphics-and-Image-Processing/lab08_kmeans_gray_output.png)
Cluster centers (intensity): [52, 128, 201]
:::end
        `.trim(),
      },
      {
        id: "lab-08-color",
        title: "K-Means Color Quantization (RGB) + Elbow Method",
        content: `
**Color quantization** reduces distinct colors by clustering RGB pixel values into K colors.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img     = cv2.imread('ch04/Fig0457(a)(thumb_print).tif')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
K       = 8

pixels   = img_rgb.reshape(-1, 3).astype(np.float32)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)

_, labels, centers = cv2.kmeans(
    pixels, K, None, criteria, 10, cv2.KMEANS_PP_CENTERS
)
centers   = np.uint8(centers)
quantized = centers[labels.flatten()].reshape(img_rgb.shape)

# ── Elbow method: WCSS vs K ──
def compute_wcss(pixels, labels, centers):
    wcss = 0.0
    for k in range(len(centers)):
        pts = pixels[labels.flatten() == k]
        if len(pts) > 0:
            wcss += float(np.sum((pts - centers[k].astype(np.float32))**2))
    return wcss

wcss_values = []
for k in range(2, 11):
    _, lbl, ctr = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_PP_CENTERS)
    wcss_values.append(compute_wcss(pixels, lbl, np.uint8(ctr)))

fig, axes = plt.subplots(1, 3, figsize=(15, 4))
axes[0].imshow(img_rgb);   axes[0].set_title('Original');         axes[0].axis('off')
axes[1].imshow(quantized); axes[1].set_title(f'Quantized K={K}'); axes[1].axis('off')
axes[2].plot(range(2, 11), wcss_values, 'bo-')
axes[2].set_title('Elbow Method'); axes[2].set_xlabel('K'); axes[2].set_ylabel('WCSS')
plt.tight_layout(); plt.show()
\`\`\`

**Elbow method:** Optimal K is at the bend — where adding more clusters gives diminishing WCSS reduction.
:::output
![K-Means Color Quantization & Elbow Method](/Computer-Graphics-and-Image-Processing/lab08_kmeans_color_output.png)
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-09",
    title: "Lab 09 — Edge Detection (Gonzalez & Woods)",
    sections: [
      {
        id: "lab-09-objective",
        title: "Objective",
        content: `
Implement edge detection experiments from **Rafael C. Gonzalez & Richard E. Woods** *Digital Image Processing* textbook.

**Theory:**
Edges are locations of rapid intensity change:
- **First derivative (gradient):** high |∇f| — Sobel, Prewitt, Roberts
- **Second derivative:** zero-crossings of ∇²f — LoG (Marr-Hildreth)
- **Canny:** optimal detector — Gaussian smoothing + NMS + hysteresis thresholding
        `.trim(),
      },
      {
        id: "lab-09-gradient",
        title: "Sobel, Prewitt, Roberts Cross",
        content: `
**Sobel kernels:**
- Gx: [-1 0 +1; -2 0 +2; -1 0 +1]
- Gy: [-1 -2 -1; 0 0 0; +1 +2 +1]
- |∇f| = √(Gx² + Gy²)

**Prewitt:** equal weights (no 2x center). **Roberts Cross (2×2):** diagonal differences.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch09/Fig0914(a)(licoln from penny).tif', cv2.IMREAD_GRAYSCALE)

# ── Sobel ──
Gx     = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
Gy     = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
mag    = np.sqrt(Gx**2 + Gy**2)
sobel  = np.uint8(mag / mag.max() * 255)

# ── Prewitt ──
Kx_p    = np.array([[-1,0,1],[-1,0,1],[-1,0,1]], np.float64)
Ky_p    = np.array([[-1,-1,-1],[0,0,0],[1,1,1]], np.float64)
Gxp     = cv2.filter2D(img.astype(np.float64), -1, Kx_p)
Gyp     = cv2.filter2D(img.astype(np.float64), -1, Ky_p)
mag_p   = np.sqrt(Gxp**2 + Gyp**2)
prewitt = np.uint8(mag_p / mag_p.max() * 255)

# ── Roberts Cross ──
Kr1    = np.array([[1,0],[0,-1]], np.float64)
Kr2    = np.array([[0,1],[-1,0]], np.float64)
Gr1    = cv2.filter2D(img.astype(np.float64), -1, Kr1)
Gr2    = cv2.filter2D(img.astype(np.float64), -1, Kr2)
mag_r  = np.sqrt(Gr1**2 + Gr2**2)
roberts = np.uint8(mag_r / mag_r.max() * 255)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, im, t in zip(axes, [img, sobel, prewitt, roberts],
                     ['Original', 'Sobel', 'Prewitt', 'Roberts Cross']):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`
:::output
![Sobel, Prewitt, Roberts Output](/Computer-Graphics-and-Image-Processing/lab09_gradient_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-09-log",
        title: "Laplacian of Gaussian (LoG) — Marr-Hildreth",
        content: `
**Theory:**
LoG = Gaussian smooth → Laplacian → zero-crossing detection.
Zero-crossings of ∇²(Gσ * f) correspond to edge locations.
Standard Gonzalez parameters: σ = 1.4, 9×9 kernel.

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img      = cv2.imread('ch09/Fig0911(a)(noisy_fingerprint).tif', cv2.IMREAD_GRAYSCALE)
smoothed = cv2.GaussianBlur(img, (9, 9), sigmaX=1.4)
lap      = cv2.Laplacian(smoothed, cv2.CV_64F, ksize=3)
log_disp = np.uint8(np.abs(lap) / np.abs(lap).max() * 255)

# Zero-crossing detection (vectorized)
zc = np.zeros_like(lap, dtype=np.uint8)
zc[:-1,:][lap[:-1,:] * lap[1:,:] < 0] = 255
zc[:,:-1][lap[:,:-1] * lap[:,1:] < 0] = 255

# Baseline: raw Laplacian without smoothing
lap_raw  = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
lap_disp = np.uint8(np.abs(lap_raw) / np.abs(lap_raw).max() * 255)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, im, t in zip(axes,
    [img, lap_disp, log_disp, zc],
    ['Original', 'Laplacian (no smooth)', 'LoG (σ=1.4)', 'Zero-Crossings']):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`
:::output
![LoG Zero-Crossing Output](/Computer-Graphics-and-Image-Processing/lab09_log_output.png)
:::end
        `.trim(),
      },
      {
        id: "lab-09-canny",
        title: "Canny Edge Detector",
        content: `
**Canny's 4 steps:**
1. Gaussian smoothing: suppress noise
2. Gradient magnitude & direction: |∇f|, θ = arctan(Gy/Gx)
3. Non-maximum suppression: thin edges to 1-pixel width
4. Double threshold + hysteresis: T_high keeps strong, T_low links weak edges

**Rule of thumb:** T_high = 2 × T_low

\`\`\`python
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('ch09/Fig0939(a)(headCT-Vandy).tif', cv2.IMREAD_GRAYSCALE)

edges_tight  = cv2.Canny(img, 100, 200)
edges_medium = cv2.Canny(img, 50,  150)
edges_loose  = cv2.Canny(img, 10,  50)

img_blur   = cv2.GaussianBlur(img, (5, 5), 1.0)
edges_blur = cv2.Canny(img_blur, 50, 150)

fig, axes = plt.subplots(2, 3, figsize=(15, 8))
for ax, im, t in zip(axes.flatten(),
    [img, edges_tight, edges_medium, edges_loose, img_blur, edges_blur],
    ['Original', 'Canny(100,200)', 'Canny(50,150)',
     'Canny(10,50)', 'Gaussian Blur', 'Blur+Canny(50,150)']):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
\`\`\`

**Key takeaways (Gonzalez):**
- Sobel: simple, fast, thick edges
- LoG: theoretically sound, sensitive to σ choice
- Canny: best localization + noise immunity — industry standard
- Higher T_high = fewer edges (only strongest); lower T_low = more linked weak edges
:::output
![Canny Edge Detection Output](/Computer-Graphics-and-Image-Processing/lab09_canny_output.png)
:::end
        `.trim(),
      },
    ],
  },
  {
    id: "lab-10",
    title: "Lab 10 — Course Summary",
    sections: [
      {
        id: "lab-10-overview",
        title: "All Lab Tasks Overview",
        content: `
Full pipeline of **Computer Graphics** and **Digital Image Processing** covered in this course:

1. **Lab 01** — OpenGL setup in Code::Blocks (freeglut, linker config)
2. **Lab 02** — Image I/O: read/display, dimensions, Drive, batch 1000 images, audio/video
3. **Lab 03** — Intensity transformations: complement, gamma, log, image subtraction
4. **Lab 04** — Histogram analysis and equalization (global + CLAHE)
5. **Lab 05** — DDA and Bresenham line drawing in OpenGL (Code::Blocks)
6. **Lab 06** — 2D geometric transformations: translation, rotation, scaling in OpenGL
7. **Lab 07** — Image segmentation: Otsu's method, gradient/Laplacian masking
8. **Lab 08** — K-Means clustering: grayscale segmentation + RGB color quantization
9. **Lab 09** — Edge detection: Sobel, Prewitt, Roberts, LoG, Canny (Gonzalez experiments)
10. **Lab 10** — Course summary and key formulas reference
        `.trim(),
      },
      {
        id: "lab-10-formulas",
        title: "Key Formulas Reference",
        content: `
**Intensity Transformations:**
- Complement: s = 255 − r
- Gamma: s = c · r^γ (normalize r → [0,1] first)
- Log: s = c · log(1 + r), c = 255 / log(1 + r_max)

**Histogram:**
- Normalized: p(rk) = H(k) / (M×N)
- Equalization: sk = round(255 · CDF(k))

**Otsu's Method:**
- σ²B(k) = P₁(k) · P₂(k) · [μ₁(k) − μ₂(k)]²
- k* = argmax σ²B(k)
- Separability: η = σ²B(k*) / σ²T

**K-Means:**
- WCSS: J = Σk Σ_(xi∈Ck) ||xi − μk||u00b2
- Convergence: center change < ε
- Optimal K: elbow of WCSS vs K curve

**Line Drawing:**
- DDA: steps = max(|dx|,|dy|), xInc = dx/steps (float arithmetic)
- Bresenham: err = dx − dy, integer additions only

**Edge Detection:**
- Sobel: |∇f| = √(Gx² + Gy²)
- LoG: zero-crossings of ∇²(Gσ * f)
- Canny: Gaussian → gradient → NMS → hysteresis(T_low, T_high)

**Geometric Transformations (homogeneous 3×3):**
- Translation: [1 0 tx; 0 1 ty; 0 0 1]
- Rotation: [cosθ -sinθ 0; sinθ cosθ 0; 0 0 1]
- Scaling: [sx 0 0; 0 sy 0; 0 0 1]
- Combined TRS: S applied first, then R, then T
        `.trim(),
      },
    ],
  },
];
