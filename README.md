# Disease Dashboard

A field surveillance dashboard for tracking disease cases, gender distribution, and age groups across different villages.

## Project Structure

```
src/
├── components/
│   ├── StatCard.jsx    (Summary cards)
│   └── PieSection.jsx  (Circular charts)
├── DiseaseDashboard.jsx (Main Layout)
└── App.js              (Entry point)
```

## Features

- **Total Tested & Positive Cases**: Real-time summary of surveillance data.
- **Gender Split**: Visualization of male vs female distribution.
- **Diarrhea Type**: Breakdown of bacterial vs non-bacterial cases.
- **Age Group**: Distribution across different age demographics.
- **Village-wise Analysis**: Comparative bar chart for positive case percentages by village.

## Technologies Used

- React.js
- Recharts (for data visualization)
- CSS (for styling)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
