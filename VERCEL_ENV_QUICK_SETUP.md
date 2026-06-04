# 🚀 VERCEL ENVIRONMENT VARIABLES - QUICK SETUP

## ⚠️ CRITICAL: You MUST Set These in Vercel Dashboard

### 1. Open Vercel Dashboard
https://vercel.com/dashboard → Select `westside-one` → Settings → Environment Variables

### 2. Add These Variables

#### JWT_SECRET (MOST IMPORTANT)
```
Name: JWT_SECRET
Value: keshavsecretjwtsecret
Scope: Production, Preview, Development
```

#### NEXT_PUBLIC_HOST
```
Name: NEXT_PUBLIC_HOST
Value: https://westside-one.vercel.app/
Scope: Production
```

#### CRYPTO_SECRET
```
Name: CRYPTO_SECRET
Value: naman#$%@@#!221323%6namanbansal@#EF
Scope: Production, Preview, Development
```

#### All Other Variables (Copy from .env.local)
```
NEXT_PUBLIC_JWT_SECRET=keshavsecretjwtsecret
NEXT_PUBLIC_KEY_ID=rzp_test_FDXSZ76LEo92zE
NEXT_PUBLIC_KEY_SECRET=qWF0L8TlfHw10g9yQoq9s7yB
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

### 3. Click "Save"

### 4. Redeploy
- Click "Redeploy" button, OR
- Push to GitHub and Vercel will auto-deploy

## ✅ What This Fixes

| Issue | Status |
|-------|--------|
| Login shows success but user stays logged out | ✅ FIXED |
| Cart items don't appear | ✅ FIXED |
| Cannot access /orders page | ✅ FIXED |
| Cookies not persisting | ✅ FIXED |
| Middleware not verifying auth | ✅ FIXED |
| Mixed JWT formats | ✅ FIXED |
| Navbar not showing username | ✅ FIXED |

## 🔍 How to Verify It Works

1. Go to https://westside-one.vercel.app/
2. Login with your credentials
3. After login:
   - [ ] Toast says "Login Success"
   - [ ] Redirected to home page
   - [ ] Navbar shows YOUR NAME (not "Login")
   - [ ] Can access /orders page
   - [ ] Can add items to cart
   - [ ] Cart items appear on /cart

## ⚠️ Debugging

**Issue:** Still getting redirected to login after login
- Clear cookies: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Check Vercel env vars are saved

**Issue:** Token verification failing
- Verify JWT_SECRET is set in Vercel
- Verify value matches: `keshavsecretjwtsecret`
- Redeploy after changing env vars

**Issue:** Cookies not saving
- Make sure using HTTPS URL (not localhost)
- Check Network tab → Cookies have "Secure" flag
- Try in incognito window
