# Server

Run and test the backend locally.

Prerequisites:

- Node.js + npm
- MongoDB running locally (default: `mongodb://localhost:27017`)

Commands:

Install dependencies:

```bash
cd server
npm install
```

Start (production):

```bash
npm run start
```

Start (development with auto-reload):

```bash
npm run dev
```

Testing endpoints from PowerShell

- Using `curl.exe` (bundled with Git for Windows or Windows 10+):

```powershell
curl.exe -v -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"secret123","birthdate":"2000-01-01"}'
```

- Using PowerShell `Invoke-RestMethod` (native):

```powershell
$body = @{ firstName='Test'; lastName='User'; email='test@example.com'; password='secret123'; birthdate='2000-01-01' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/auth/register' -Body $body -ContentType 'application/json'
```

Note: In PowerShell plain `curl` is an alias for `Invoke-WebRequest`. Use `curl.exe` to call the true curl binary if installed.

If you get `400` responses, check the server terminal where the global error handler will print stack traces and validation errors.
