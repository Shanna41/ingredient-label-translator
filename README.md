

# **Ingredient Label Translator**

A lightweight, privacy‑first tool that translates confusing ingredient labels into clear, human‑friendly explanations. Built with an emphasis on accessibility, clarity, and holistic wellness, this app runs entirely in the browser and requires no backend or data collection.

This project is intentionally simple, resilient, and easy to maintain — a production‑ready tool designed to help people understand what’s in their products.

Demo Link: https://ingredient-translator.netlify.app

---



---

# **Who This Is For**

Designed for functional medicine practitioners, holistic wellness coaches, and ingredient-onscious consumers seeking clarity without complexity.

---

# **Why It Matters**

Ingredient labels are often confusing, inaccessible, and overwhelming -- especially for patients navigating chronic illness. This tool empowers practitioners and consumers to decode labels instantly, without compromising privacy or usability.

## **✨ Features**

- **Ingredient translation**  
  Converts complex ingredient names into plain‑language explanations.

- **Holistic wellness focus**  
  Explanations prioritize clarity and everyday understanding.

- **PDF export**  
  Users can generate clean, readable PDFs of translated ingredient lists.

- **Accessible UI**  
  Built with accessibility best practices and tested with modern tooling.

- **Fast, static, offline‑friendly**  
  Powered by Vite for instant builds and client‑side performance.

- **Privacy‑first**  
  No tracking, no backend, no data storage.

---

## **🛠️ Tech Stack**

- **React** — modern component architecture  
- **Vite** — fast dev server and optimized builds  
- **PDF generation dependency** — for clean exportable reports  
- **Accessibility tooling** — a11y‑focused design and testing  
- **Vitest (v8/12)** — unit testing for reliability and resilience  

---

## **📦 Getting Started**

### **Install dependencies**
```
npm install
```

### **Run the development server**
```
npm run dev
```

### **Build for production**
```
npm run build
```

The output will appear in the `dist` folder.

---

## **🚀 Deployment**

This project can be deployed on:

- **Netlify**  
- **GitHub Pages**  
- **Fleek**  
- Any static hosting provider

For Netlify:

- **Build command:** `npm run build`  
- **Publish directory:** `dist`  

If you use client‑side routing, add a `_redirects` file:

```
/*    /index.html   200
```

---

## **📁 Project Structure**

```
src/
  components/
  data/
  utils/
  tests/
  App.jsx
  main.jsx
public/
README.md
package.json
```

---

## **🧩 How It Works**

The translator uses a structured JSON dataset of ingredients and their explanations. When a user enters an ingredient:

1. The input is normalized  
2. The dataset is searched  
3. A clear explanation is returned  
4. A fallback message appears if the ingredient isn’t found  

PDF export allows users to save or share their results in a clean, readable format.

---

## **🧪 Testing**

This project uses **Vitest 8/12** for:

- unit tests  
- utility function validation  
- component behavior checks  

Run tests with:

```
npm run test
```

---

## **🌱 Future Enhancements**

- Expanded ingredient dataset  
- Practitioner‑friendly export formats  
- Offline caching  
- Additional categories (cosmetics, supplements, etc.)  

---

## **📜 License**

MIT License — free to use, modify, and build upon.

---




