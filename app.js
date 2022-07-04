const canvas = document.querySelector('canvas');


const ctx = canvas.getContext('2d');


const img = document.querySelector('#my-img');
const c0 = document.querySelector('.color-0');

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    img.crossOrigin = "anonymous";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
window.onresize = function (event) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function rgb2hex(rgb) {
    var code = "#";
    for (var i=0; i<3; i++) {
        code += "0123456789ABCDEF"[Math.floor(rgb[i] / 16)];
        code += "0123456789ABCDEF"[rgb[i] % 16];
    }
    return code;
}

function renderColor(color) {
    const c = c0.cloneNode(true);
    const code = rgb2hex(color);
    c.children[0].style.backgroundColor = code;
    c.children[1].textContent = code;
    const p = document.querySelector('.pallete');
    p.appendChild(c);

    c.onclick = function () {
        c.children[2].style.display = '';
        const copyToClipboard = function (str) {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        };
        copyToClipboard(c.children[1].textContent);
        setTimeout(function () {
            c.children[2].style.display = 'none';
        }, 1000);
    }
}

function _clear() {
    const cs = document.querySelectorAll('.color-0');
    for (var i=1; i<cs.length; i++) {
        cs[i].remove();
    }
}


img.onmousemove = function (event) {
    const data = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
    const color = rgb2hex(data.data);
    c0.children[0].style.backgroundColor = color;
    c0.children[1].textContent = color;

    // console.log([event.offsetX, event.offsetY])
    // console.log(data);

    // const s = document.getElementById('square');
    // const color = data.data;
    // console.log(color);
    // s.style.backgroundColor = 'rgb('+ color[0] + ',' + color[1] + ',' + color[2] + ')';
}

img.onclick = function (event) {
    const data = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
    renderColor(data.data);
}


const imgInp = document.getElementById('uf-input');
imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      img.src = URL.createObjectURL(file);
      _clear();
    }
}

const goBtn = document.getElementById('lfw-btn');
goBtn.onclick = function () {
    const urlInp = document.getElementById('lfw-input');
    const url = urlInp.value.trim();
    if (url.length == 0) {
        alert('Please specify a url');
        return;
    }
    urlInp.value = '';
    img.src = url;
    _clear();
}