# Resume Download Link - Md Azad Portfolio

## 📄 Resume Information

### Current Resume Link
**Google Drive Link**: `https://drive.google.com/file/d/1MR8UkXbUzMaaR33w9NieLUWrv0H_0kW-/view?usp=sharing`

**File ID**: `1MR8UkXbUzMaaR33w9NieLUWrv0H_0kW-`

### Implementation Details

#### HTML (index.html)
```html
<a href="https://drive.google.com/file/d/1MR8UkXbUzMaaR33w9NieLUWrv0H_0kW-/view?usp=sharing" 
   class="btn btn-primary" 
   id="download-resume" 
   data-resume-url="https://drive.google.com/uc?export=download&id=1MR8UkXbUzMaaR33w9NieLUWrv0H_0kW-"
   target="_blank" 
   rel="noopener noreferrer">
    <i class="fas fa-download"></i> Download Resume
</a>
```

#### Features
- ✅ Opens in new tab (`target="_blank"`)
- ✅ Security attributes (`rel="noopener noreferrer"`)
- ✅ Success notification when clicked
- ✅ Console logging for debugging
- ✅ Google Drive direct link for viewing
- ✅ Download link in data attribute

### How It Works

1. **User clicks "Download Resume" button**
2. **Opens Google Drive link in new tab** (user can view or download)
3. **Shows success notification** in the portfolio
4. **Logs action in console** for tracking

### Google Drive Link Types

1. **View Link** (Current):
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
   - Users can view the resume
   - They can download using Google Drive's download button
   - More control over sharing

2. **Direct Download Link** (Stored in data attribute):
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```
   - Forces immediate download
   - Can be used for automated downloads

### How to Update Resume Link

#### Step 1: Upload New Resume to Google Drive
1. Go to [Google Drive](https://drive.google.com)
2. Upload your resume PDF
3. Right-click the file → "Get link"
4. Set sharing to "Anyone with the link can view"
5. Copy the link

#### Step 2: Extract File ID
From link: `https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing`
- Copy the `FILE_ID_HERE` part

#### Step 3: Update in Code
Replace in `index.html`:
```html
href="https://drive.google.com/file/d/YOUR_NEW_FILE_ID/view?usp=sharing"
data-resume-url="https://drive.google.com/uc?export=download&id=YOUR_NEW_FILE_ID"
```

### Sharing Settings

**Current Settings**:
- 🔓 **Access**: Anyone with the link
- 👁️ **Permission**: Viewer
- 📥 **Can download**: Yes (via Google Drive interface)

### Testing

1. **Test in Browser**:
   - Click "Download Resume" button
   - Should open Google Drive in new tab
   - Verify resume displays correctly
   - Test download button in Google Drive

2. **Test Notification**:
   - Check for success notification
   - Should say "Resume opened! You can view or download it from Google Drive."

3. **Check Console**:
   - Open browser console (F12)
   - Should see: "📄 Resume link opened: ..."

### Alternative Hosting Options

If you want to host resume elsewhere:

1. **GitHub Pages**:
   - Upload PDF to repository
   - Link: `https://username.github.io/repo/resume.pdf`

2. **Cloudinary**:
   - Upload to Cloudinary
   - Get public URL

3. **Dropbox**:
   - Upload to Dropbox
   - Get sharing link
   - Change `www.dropbox.com` to `dl.dropboxusercontent.com`

4. **Direct Server**:
   - Upload to your web server
   - Link: `https://yourwebsite.com/resume.pdf`

### Security Considerations

✅ **Current Setup is Secure**:
- Uses `rel="noopener noreferrer"` to prevent tab-nabbing
- Opens in new tab to keep portfolio open
- Google Drive provides virus scanning
- Controlled sharing permissions

### Troubleshooting

**Issue**: Resume link doesn't open
- **Solution**: Check Google Drive sharing settings

**Issue**: 404 or access denied
- **Solution**: Ensure link is set to "Anyone with the link"

**Issue**: Download doesn't work
- **Solution**: User can click download button in Google Drive interface

**Issue**: Want to force download
- **Solution**: Use the direct download URL in data-resume-url attribute

### Best Practices

1. ✅ Keep resume updated (add version/date to filename)
2. ✅ Use PDF format (universal compatibility)
3. ✅ Keep file size under 2MB
4. ✅ Use professional filename (e.g., "Md_Azad_Resume_2025.pdf")
5. ✅ Test link regularly to ensure it works
6. ✅ Consider having multiple versions (detailed, one-page, etc.)

---

**Updated by**: Md Azad  
**Date**: October 15, 2025  
**Status**: ✅ Active and Working
