# Highlight Headers Bookmarklet

This bookmarklet highlights all `h1` through `h6` tags on a webpage, outlining them in red and displaying their tag name in yellow.

## Limitation

Bookmarklets have a character limit (around 2000 characters). If the bookmarklet code exceeds this limit, you can use an external JavaScript file.

## How to Use

1. Copy the bookmarklet code below.
2. Open your browser and right-click on the bookmarks bar.
3. Select **Add page...** or **Add bookmark...**.
4. Give the bookmark a name, like **Highlight Headers**.
5. Paste the bookmarklet code in the **URL** field.
6. Save the bookmark.
7. Go to the the webpage that you want to test.
8. Click the new bookmark named **Highlight Headers**
9. You should now see the headers labelled.

### Bookmarklet Code

Javasript needs to be on one line, 
```javascript
javascript:(function(){document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{const t=h.tagName.toLowerCase(),l=document.createElement('span');Object.assign(l.style,{position:'relative',background:'yellow',color:'black','-webkit-text-fill-color':'black',fontSize:'20px',lineHeight:'22px',fontWeight:'bold',padding:'2px',border:'1px solid black',top:'-20px',left:'0px',zIndex:'1000'});l.textContent=t,h.appendChild(l);h.style.outline='2px solid red'})})();
```
# Highlight Headers Bookmarklet using an external script due to character limit

This bookmarklet highlights all `h1` through `h6` tags on a webpage, outlining them in red and displaying their tag name in yellow.

## How to Use

1. Copy the bookmarklet code below.
2. Open your browser and right-click on the bookmarks bar.
3. Select **Add page...** or **Add bookmark...**.
4. Give the bookmark a name, like **Highlight Headers**.
5. Paste the bookmarklet code in the **URL** field.
6. Save the bookmark.

### Bookmarklet Code (Fetching External Script)

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://raw.githubusercontent.com/William-Harvey/highlight-headers-bookmarklet/main/highlight-headers.js';document.body.appendChild(s);})();

