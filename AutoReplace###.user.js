// ==UserScript==
// @name         Auto Replace ### on Paste
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically replaces '###' with your defined replacement on paste using Ctrl+V.
// @author       Cedric Sapno
// @match        *
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

GM_registerMenuCommand("Change LEARN (" + await getID() + ")", async () => {
  const newCode = prompt("LEARN ###");
  if (newCode !== null && newCode !== "") {
    await GM_setValue("learnNum", newCode);
    const current = await getID();
    location.reload();
    alert(`Saved: ${current}`);
  } else {
    const current = await getID();
    alert(`Cancelled. Current: ${current}`);
  }
});

async function getID() {
  return await GM_getValue("learnNum", "123");
}

(function() {
  'use strict';

  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      setTimeout(async function() {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          let currentValue = activeElement.value;
          const code = await getID();
          let newValue = currentValue.replace(/###/g, code);
          if (currentValue !== newValue) {
            activeElement.value = newValue;
          }
        }
      }, 10);
    }
  });

  document.addEventListener('input', async function(event) {
    const activeElement = event.target;
    if (activeElement &&
        (activeElement.tagName === 'INPUT' ||
         activeElement.tagName === 'TEXTAREA' ||
         activeElement.isContentEditable)) {

      const code = await getID();

      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        let currentValue = activeElement.value;
        if (currentValue.includes('###')) {
          let newValue = currentValue.replace(/###/g, code);
          const cursorPosition = activeElement.selectionStart;
          activeElement.value = newValue;
          activeElement.setSelectionRange(cursorPosition, cursorPosition);
        }
      } else if (activeElement.isContentEditable) {
        let innerHTML = activeElement.innerHTML;
        if (innerHTML.includes('###')) {
          let newHTML = innerHTML.replace(/###/g, code);
          activeElement.innerHTML = newHTML;
        }
      }
    }
  }, true);
})();
