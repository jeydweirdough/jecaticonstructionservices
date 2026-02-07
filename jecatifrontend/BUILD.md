
## 🔹 After React Installation

Follow these steps carefully:

### Clean environment

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Install proper npm packages

```bash
npm install react@18 react-dom@18 react-router-dom lucide-react html2canvas jspdf
npm install -D typescript @types/react @types/react-dom
```

### Check for duplicate React

```bash
npm ls react
npm ls react-dom
```

* Only **one version** of each should exist.
* If there are duplicates, run:

```bash
npm dedupe
```
