javascript:(function(){
    let h1Found=false,lastHeadingLevel=0,h1Count=0;
    
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{
        const tagName=h.tagName.toLowerCase(),
        currentLevel=parseInt(tagName.slice(1)),
        label=document.createElement('span'),
        suggestion=document.createElement('span'),
        headerText=h.textContent.trim();

        // Label styling
        Object.assign(label.style,{
            position:'relative',background:'yellow',color:'black','-webkit-text-fill-color':'black',
            fontSize:'20px',lineHeight:'22px',fontWeight:'bold',padding:'2px',border:'1px solid black',
            top:'0px',left:'0px',zIndex:'1000'
        });

        // Suggestion styling
        Object.assign(suggestion.style,{
            position:'static',background:'lightblue',color:'black','-webkit-text-fill-color':'black',
            fontSize:'16px',lineHeight:'18px',fontWeight:'normal',padding:'2px',border:'1px solid blue',
            top:'-20px',left:'10px',zIndex:'1000'
        });

        // Add the label
        label.textContent=tagName;
        h.appendChild(label);

        if(!headerText){
            suggestion.textContent=`Warning: This <${tagName}> is missing text!`;
            h.style.outline='2px solid purple';
            h.appendChild(suggestion);
        }

        // Handle <h1> specifically
        if(tagName==='h1'){
            h1Count++;
            if(h1Count>1){
                suggestion.textContent=`Warning: Multiple <h1> tags found. Only one is allowed.`;
                h.style.outline='2px solid red';
                h.appendChild(suggestion);
            } else {
                h.style.outline='2px solid red';
            }
            h1Found=true;
            lastHeadingLevel=1;
            return;
        }

        if(!h1Found && currentLevel !== 1){
            suggestion.textContent=`Suggestion: Use <h1> first`;
            h.style.outline='2px solid blue';
            h.appendChild(suggestion);
        } else if(h1Found){
            if(currentLevel - lastHeadingLevel > 1){
                const suggestedHeading = `h${lastHeadingLevel+1}`;
                suggestion.textContent = `Suggestion: Should be <${suggestedHeading}> to avoid skipping levels.`;
                h.style.outline='2px solid orange';
                h.appendChild(suggestion);
            } else if(currentLevel+1 < lastHeadingLevel){
                suggestion.textContent = `Warning: Cannot skip back more than one level!`;
                h.style.outline='2px solid red';
                h.appendChild(suggestion);
            } else {
                h.style.outline='2px solid red';
            }
            lastHeadingLevel=currentLevel;
        }
    });

    // 'View Header Formation' button
    const viewHeadersButton=document.createElement('button');
    viewHeadersButton.textContent='View Header Formation';
    Object.assign(viewHeadersButton.style,{
        position:'fixed',bottom:'50px',left:'10px',padding:'10px',backgroundColor:'lightgreen',
        color:'black',zIndex:'9999',fontSize:'14px',border:'1px solid black',cursor:'pointer'
    });

    viewHeadersButton.onclick=function(){
        const headerReport=document.createElement('div');
        headerReport.style.padding='20px';
        headerReport.style.backgroundColor='white';
        headerReport.style.border='1px solid black';
        headerReport.style.marginTop='10px';
        headerReport.style.position='fixed';
        headerReport.style.top='100px';
        headerReport.style.left='10px';
        headerReport.style.zIndex='9998';
        headerReport.innerHTML='<h3>Header Structure:</h3>';

        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{
            const headerText=h.textContent.trim();
            const tagName=h.tagName.toLowerCase();
            const reportLine=document.createElement('div');
            reportLine.style.marginBottom='5px';
            let error='';

            if(!headerText){
                error=' <span style="color:red">(missing text)</span>';
            } else if(h.style.outline==='2px solid orange'){
                error=' <span style="color:orange">(skipped level)</span>';
            } else if(h.style.outline==='2px solid red'){
                error=' <span style="color:red">(out of order or multiple h1)</span>';
            }

            reportLine.innerHTML=`<strong>${tagName}</strong>: ${headerText}${error}`;
            headerReport.appendChild(reportLine);
        });

        document.body.appendChild(headerReport);
    };
    document.body.appendChild(viewHeadersButton);

    // 'Cleanup Diagnostic Labels' button
    const cleanupButton=document.createElement('button');
    cleanupButton.textContent='Cleanup Diagnostic Labels';
    Object.assign(cleanupButton.style,{
        position:'fixed',bottom:'10px',left:'10px',padding:'10px',backgroundColor:'lightcoral',
        color:'white',zIndex:'9999',fontSize:'14px',border:'1px solid black',cursor:'pointer'
    });

    cleanupButton.onclick=function(){
        document.querySelectorAll('span,button').forEach(el=>{
            if(el.textContent.includes('h1') || el.textContent.includes('Suggestion') || el.textContent.includes('Warning') || el.tagName==='BUTTON'){
                el.remove();
            }
        });
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>h.style.outline='');
    };

    document.body.appendChild(cleanupButton);
})();
