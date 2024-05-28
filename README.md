# Compound Lite

This project is a minimal frontend for the [Compound V3](https://docs.compound.finance) protocol.

See the [demo site](https://compound-ui-one.vercel.app).

It is built with the [Compound V3 Community Subgraphs](https://github.com/papercliplabs/compound-v3-subgraph) by [Paperclip Labs](https://paperclip.xyz).

## Run the App in Development Mode

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `./.env.local` file and set these variables:
   ```plaintext
   // Your wallet project ID (https://docs.walletconnect.com)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

   // Mainnet RPC URL
   NEXT_PUBLIC_MAINNET_RPC=

   // Compound V3 Community Subgraphs API Key
   NEXT_PUBLIC_SUBGRAPH_API_KEY=
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000/) to view the app in the browser.

## Deploy the App in Production

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `./.env.local` file and set these variables:
   ```plaintext
   // Your wallet project ID (https://docs.walletconnect.com)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

   // Mainnet RPC URL
   NEXT_PUBLIC_MAINNET_RPC=

   // Compound V3 Community Subgraphs API Key
   NEXT_PUBLIC_SUBGRAPH_API_KEY=
   ```

3. Build the app for production:
   ```bash
   npm run build
   ```

This creates a `build` directory with a production build of your app. Set up your favorite HTTP server to serve the `index.html` file to visitors.