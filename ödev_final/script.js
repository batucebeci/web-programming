let yapilacaklar = [];
let duzenleIndex = -1; 

function Ekle() {
    const ekleInput = document.getElementById('ekleInput');
    const yapilacakText = ekleInput.value.trim();

    if (yapilacakText !== '') {
        yapilacaklar.push({ text: yapilacakText, durum: false });
        ekleInput.value = '';
        goster();
    }
}
function goster() {
    yapilacakGoster(yapilacaklar);
}
function devamEdenler() {
    const devamEdenYapilacaklar = yapilacaklar.filter(yapilacak => !yapilacak.durum);
    yapilacakGoster(devamEdenYapilacaklar);
}

function bitenler() {
    const bitenYapilacaklar = yapilacaklar.filter(yapilacak => yapilacak.durum);
    yapilacakGoster(bitenYapilacaklar);
}

function temizle() {
    yapilacaklar = [];
    goster();
    document.getElementById('yapilacakListesi').innerHTML = '_ _ Yapılacaklar Listesi Boş _ _';
}

function yapilacakGoster(yapilacakArray) {
    const yapilacakListesi = document.getElementById('yapilacakListesi');
    yapilacakListesi.innerHTML = '';

    yapilacakArray.forEach((task, index) => {
        const yapilacakList = document.createElement('li');
        yapilacakList.className = 'list-group-item d-flex justify-content-between align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.durum;
        checkbox.addEventListener('change', () => YapilacakDurum(index));

        const yapilacakText = document.createElement('span');
        yapilacakText.textContent = task.text;
        yapilacakText.style.textDecoration = task.durum ? 'line-through' : 'none';

        const ucnokta = document.createElement('button');
        ucnokta.className = 'btn btn-secondary btn-sm';
        ucnokta.textContent = '...';
        ucnokta.onclick = () => ayarGoster(index);

        yapilacakList.appendChild(checkbox);
        yapilacakList.appendChild(yapilacakText);
        yapilacakList.appendChild(ucnokta);

        yapilacakListesi.appendChild(yapilacakList);
    });
}

function YapilacakDurum(index) {
    yapilacaklar[index].durum = !yapilacaklar[index].durum;
    goster();
}

function ayarGoster(index) {
    const suankiAyar = document.querySelectorAll('.ayarlarDiv');
    suankiAyar.forEach(option => option.remove());

    const ayarlarDiv = document.createElement('div');
    ayarlarDiv.className = 'btn-group-vertical ayarlarDiv';

    const duzenle = document.createElement('button');
    duzenle.className = 'btn-sm';
    duzenle.textContent = 'Düzenle';
    duzenle.onclick = () => yapilacakDuzenle(index);

    const sil = document.createElement('button');
    sil.className = 'btn-sm mt-2'; 
    sil.textContent = 'Sil';
    sil.onclick = () => yapilacakSil(index);

    ayarlarDiv.appendChild(duzenle);
    ayarlarDiv.appendChild(sil);

    const yapilacakList = document.querySelectorAll('.list-group-item')[index];
    yapilacakList.appendChild(ayarlarDiv);
}

function yapilacakSil(index) {
    yapilacaklar.splice(index, 1);
    goster();
}

function yapilacakDuzenle(index) {
    const duzenlenecek = yapilacaklar[index];
    const yeniMetin = prompt('Yeni metni girin:', duzenlenecek.text);

    if (yeniMetin !== null) {
        yapilacaklar[index].text = yeniMetin;
        goster();

        const ekleInput = document.getElementById('ekleInput');
        ekleInput.value = yeniMetin;
        ekleInput.focus();

        function yapilacakSil(index) {
            yapilacaklar.splice(index, 1);
            goster();
        }
        
    }
}


