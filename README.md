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
javascript:(function(){let h1Found=false,lastHeadingLevel=0,h1Count=0;document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{const tagName=h.tagName.toLowerCase(),currentLevel=parseInt(tagName.slice(1)),label=document.createElement('span'),suggestion=document.createElement('span'),headerText=h.textContent.trim();Object.assign(label.style,{position:'relative',background:'yellow',color:'black','-webkit-text-fill-color':'black',fontSize:'20px',lineHeight:'22px',fontWeight:'bold',padding:'2px',border:'1px solid black',top:'-20px',left:'0px',zIndex:'1000'});Object.assign(suggestion.style,{position:'relative',background:'lightblue',color:'black','-webkit-text-fill-color':'black',fontSize:'16px',lineHeight:'18px',fontWeight:'normal',padding:'2px',border:'1px solid blue',top:'-20px',left:'10px',zIndex:'1000'});label.textContent=tagName;h.appendChild(label);if(!headerText){suggestion.textContent=`Warning: This <${tagName}> is missing text!`;h.style.outline='2px solid purple';h.appendChild(suggestion);}if(tagName==='h1'){h1Count++;if(h1Count>1){suggestion.textContent=`Warning: Multiple <h1> tags found. Only one is allowed.`;h.style.outline='2px solid red';h.appendChild(suggestion);}h1Found=true;lastHeadingLevel=1;return;}if(!h1Found&&currentLevel!==1){suggestion.textContent=`Suggestion: Use <h1> first`;h.style.outline='2px solid blue';h.appendChild(suggestion);}else if(h1Found){if(currentLevel-lastHeadingLevel>1){const suggestedHeading=`h${lastHeadingLevel+1}`;suggestion.textContent=`Suggestion: Should be <${suggestedHeading}> to avoid skipping levels.`;h.style.outline='2px solid orange';h.appendChild(suggestion);}else if(currentLevel+1<lastHeadingLevel){suggestion.textContent=`Warning: Cannot skip back more than one level!`;h.style.outline='2px solid red';h.appendChild(suggestion);}else{h.style.outline='2px solid red';}lastHeadingLevel=currentLevel;}});const cleanupButton=document.createElement('button');cleanupButton.textContent='Cleanup Diagnostic Labels';Object.assign(cleanupButton.style,{position:'fixed',bottom:'10px',right:'10px',padding:'10px',backgroundColor:'lightcoral',color:'white',zIndex:'1001',fontSize:'14px',border:'none',cursor:'pointer'});cleanupButton.onclick=function(){document.querySelectorAll('span,button').forEach(el=>{if(el.textContent.includes('h1')||el.textContent.includes('Suggestion')||el.textContent.includes('Warning')||el.tagName==='BUTTON'){el.remove();}});document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>h.style.outline='');};document.body.appendChild(cleanupButton);})();
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
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/William-Harvey/highlight-headers-bookmarklet/highlight-headers.js';document.body.appendChild(s);})();

