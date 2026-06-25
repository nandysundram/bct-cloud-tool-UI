# Password Validation Test Cases

## ❌ These Passwords Will NOT Work (Will Show Errors):

1. **`test`** 
   - ❌ Too short (less than 8 characters)
   - ❌ No uppercase letter
   - ❌ No number
   - ❌ No special character

2. **`password`**
   - ❌ No uppercase letter
   - ❌ No number
   - ❌ No special character

3. **`Password`**
   - ❌ No number
   - ❌ No special character

4. **`password123`**
   - ❌ No uppercase letter
   - ❌ No special character

5. **`Password123`**
   - ❌ No special character

6. **`Pass1!`**
   - ❌ Too short (less than 8 characters)

## ✅ These Passwords WILL Work:

1. **`Password1!`**
   - ✅ 10 characters
   - ✅ Has uppercase (P)
   - ✅ Has lowercase (assword)
   - ✅ Has number (1)
   - ✅ Has special char (!)

2. **`MyP@ssw0rd`**
   - ✅ 10 characters
   - ✅ Has uppercase (M, P)
   - ✅ Has lowercase (yssword)
   - ✅ Has number (0)
   - ✅ Has special char (@)

3. **`Secure#123`**
   - ✅ 10 characters
   - ✅ Has uppercase (S)
   - ✅ Has lowercase (ecure)
   - ✅ Has number (123)
   - ✅ Has special char (#)

4. **`Admin@2024`**
   - ✅ 10 characters
   - ✅ Has uppercase (A)
   - ✅ Has lowercase (dmin)
   - ✅ Has number (2024)
   - ✅ Has special char (@)

## 🧪 How to Test:

### Test Sign In (Login):
1. Go to http://localhost:5173/
2. Click "Get Started"
3. Try entering `test` as password
4. Click "Sign In"
5. **Result**: You should see error: "Password must be at least 8 characters long"

### Test Sign Up (Registration):
1. Click "Sign Up" at the bottom
2. Enter name and email
3. Try entering `password` as password
4. **Result**: You should see error and red strength indicator
5. Try entering `Password1!`
6. **Result**: You should see green strength indicator and no errors

### Test Password Strength Indicator:
1. In the password field, type slowly: `P` → `Pa` → `Pas` → `Pass` → `Pass1` → `Pass1!`
2. Watch the strength bar change colors:
   - Red (weak) → Yellow (fair) → Blue (good) → Green (strong)

### Test Confirm Password:
1. In Sign Up mode
2. Enter `Password1!` in password field
3. Enter `Password1!` in confirm password field
4. **Result**: Green checkmark "✓ Passwords match"
5. Change confirm password to `Password1`
6. **Result**: Red error "Passwords do not match"

## 🔒 Security Note:

**Both Sign In and Sign Up now enforce the same password requirements!**

This means:
- Users cannot login with weak passwords
- Users cannot register with weak passwords
- All passwords must meet security standards
- Real-time feedback helps users create strong passwords

---

**Current Status**: ✅ Password validation is working for BOTH login and registration!