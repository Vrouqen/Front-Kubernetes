const LS_KEYS = { title: 'silksong:title', text: 'silksong:text', image: 'silksong:image' };

const cover = document.getElementById('cover');
const heroTitle = document.getElementById('heroTitle');
const mainText = document.getElementById('mainText');
const toggleEditBtn = document.getElementById('toggleEdit');
const imgInput = document.getElementById('imgInput');

const placeholder = "https://dummyimage.com/1600x900/111217/ffffff&text=Sube+una+imagen";

function loadState() {
  cover.src = localStorage.getItem(LS_KEYS.image) || placeholder;
  mainText.innerHTML = localStorage.getItem(LS_KEYS.text) || mainText.innerHTML;
  heroTitle.textContent = localStorage.getItem(LS_KEYS.title) || heroTitle.textContent;
}

function saveState() {
  localStorage.setItem(LS_KEYS.text, mainText.innerHTML.trim());
  localStorage.setItem(LS_KEYS.title, heroTitle.textContent.trim());
}

let editing = false;
function setEditing(state) {
  editing = state;
  mainText.setAttribute("contenteditable", editing);
  heroTitle.setAttribute("contenteditable", editing);
  toggleEditBtn.textContent = editing ? "Guardar" : "Modo edición";
  if (!editing) saveState();
}

toggleEditBtn.addEventListener("click", () => setEditing(!editing));

imgInput.addEventListener("change", e => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    cover.src = reader.result;
    localStorage.setItem(LS_KEYS.image, reader.result);
  };
  reader.readAsDataURL(file);
});

mainText.addEventListener("input", saveState);
heroTitle.addEventListener("input", saveState);

loadState();
