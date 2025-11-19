# Dream Diary

A sophisticated dream interpretation website powered by xAI's Grok-4 model, designed with a Diptyque-inspired aesthetic.

## Features

- 🌙 AI-powered dream interpretation using Grok-4-fast-reasoning
- 🎨 Elegant Diptyque-inspired design with oval label motifs
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔒 Secure API key management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Playfair Display (serif), Inter (sans-serif)
- **AI Model**: xAI Grok-4-fast-reasoning
- **Deployment**: Hetzner VPS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- xAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dreamdiary
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
XAI_API_KEY=your_xai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is designed to be deployed on a Hetzner VPS at dreamdiary.co.

### Deployment Steps

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

2. SSH into your Hetzner server:
```bash
ssh -i hetzner_key root@<server-ip>
```

3. Install dependencies on the server:
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt-get install -y nginx

# Install Git
apt-get install -y git
```

4. Clone and setup the project:
```bash
cd /var/www
git clone <your-github-repo> dreamdiary
cd dreamdiary
npm install
```

5. Create production environment file:
```bash
echo "XAI_API_KEY=your_xai_api_key_here" > .env
```

6. Build and start the application:
```bash
npm run build
pm2 start npm --name "dream-diary" -- start
pm2 save
pm2 startup
```

7. Configure Nginx:
```bash
nano /etc/nginx/sites-available/dreamdiary.co
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name dreamdiary.co www.dreamdiary.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/dreamdiary.co /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

8. Setup SSL with Certbot:
```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d dreamdiary.co -d www.dreamdiary.co
```

## Project Structure

```
dreamdiary/
├── app/
│   ├── api/
│   │   └── interpret/
│   │       └── route.ts          # API endpoint for dream interpretation
│   ├── components/
│   │   ├── DreamInput.tsx        # Dream input form
│   │   ├── InterpretationDisplay.tsx  # Interpretation modal
│   │   ├── LoadingAnimation.tsx  # Loading state
│   │   └── OvalLabel.tsx         # Diptyque-style oval container
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main page
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Design Philosophy

The design is inspired by Diptyque's sophisticated aesthetic:

- **Typography**: Elegant serif fonts (Playfair Display) for headings, clean sans-serif (Inter) for body text
- **Color Palette**: High-contrast black and white with subtle textures
- **Layout**: Central oval label motif reminiscent of Diptyque's iconic perfume labels
- **Interactions**: Smooth, refined animations that feel luxurious yet not overdone

## License

MIT
