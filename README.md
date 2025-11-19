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

This project is deployed on a Hetzner VPS at **https://dreamdiary.co**

### Quick Deploy

For subsequent deployments, simply run:

```bash
./deploy.sh
```

This script will:
1. Commit and push changes to GitHub
2. SSH into the server
3. Pull latest changes
4. Install dependencies
5. Build the application
6. Restart the PM2 process

### Initial Deployment (Already Complete)

The application has been deployed with the following setup:

- **Server**: Hetzner VPS (178.156.161.136)
- **Domain**: dreamdiary.co (with SSL via Let's Encrypt)
- **Process Manager**: PM2 (auto-restart on server reboot)
- **Web Server**: Nginx (reverse proxy)
- **Node.js**: v20.19.5
- **Environment**: Production with xAI API key configured

### Manual Deployment Steps (Reference)

If you need to deploy manually or to a new server:

1. **Provision Server**:
```bash
# Install Node.js, PM2, Nginx, Git, Certbot
ssh -i hetzner_key root@<server-ip>
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx git certbot python3-certbot-nginx
npm install -g pm2
```

2. **Clone and Build**:
```bash
cd /var/www
git clone https://github.com/prepexai/dreamdiary.git
cd dreamdiary
echo "XAI_API_KEY=your_key_here" > .env
npm install
npm run build
```

3. **Start with PM2**:
```bash
pm2 start npm --name "dream-diary" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx**:
```bash
# Create config at /etc/nginx/sites-available/dreamdiary.co
# Enable site and restart Nginx
ln -s /etc/nginx/sites-available/dreamdiary.co /etc/nginx/sites-enabled/
systemctl restart nginx
```

5. **Setup SSL**:
```bash
certbot --nginx -d dreamdiary.co -d www.dreamdiary.co --non-interactive --agree-tos --email admin@dreamdiary.co --redirect
```

### Monitoring

Check application status:
```bash
ssh -i hetzner_key root@178.156.161.136 'pm2 status'
```

View logs:
```bash
ssh -i hetzner_key root@178.156.161.136 'pm2 logs dream-diary'
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
