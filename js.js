`use strict`;
const artifactMap = [
        [0,1,2,3,4,5,6],
        [7,7,7,8,9,9,10,10,11,11],
        [7,8,9,12,13,14,15,16,17,21],
        [16,16,17,18,19,20,20,21,21,21,22,23,24],
        [18,18,25,26,26,27,28,28,29,30,30,31,32,32,33,33],
        [34,35,36,36,37,38,39,40,41,41,41,41,42,42,42,42],
        [34,38,41,43,43,44,45,46,47,48,49,50,51,52,52,52,52]
        ];
const artifactIndex = [
        'necklace', 'helmet', 'bracer', 'ring', 'cloak', 'armor', 'glove'
        ];
const highlightColor = '#874000';
const textToToolTIp = [
    ['На трупе Наемника Тартуччио','На трупе ??????????', 'Попасть можно либо после выполнения квеста привратницы Квогги' +
    '(стоит у северо-западного входа), либо забрав шахтерский рычаг в недрах пещеры (у восточного входа) и протаранив ' +
    'вагонеткой завал', 'В северо-восточной части карты, на берегу подземного озера','Перед бродом с ловушками',
        'На восточном берегу острова, проверка внимания +16'],
    ['На холме в северо-восточной части карты.','Перед мостом в южной части карты, проверка внимания +3',
        'В скрытом сундуке (проверка внимания +12), в северо-западной части карты, проверка плутовства +11',
        'В северо-восточном улгу карты, проверка внимания +3',
        'На северо-западном уступе крепостной стены, внутри ящика',
        'На юго-западном уступе крепостной стены, нужен ключ от дварфийского сундука',
        'В комнате Каргадда, внутри сундука', 'Перед северо-восточным спуском в глубины логова троллей',
        'В северо-восточном углу карты, проверка внимания +3', 'В юго-восточной комнате'],
    ['В сундуке западней моста на юге карты, плутовство +16','У разбойника в северо-западной части карты.',
        'В западной части карты','На левом берегу Смрадки, непосредственно перед бродом, проверка внимания +3',
        'В северо-западном углу карты', 'В хижине вождя', 'Мухоловка ??????? внимание +3',
        'В восточной части карты, за хижиной гоблинов, проверка внимания +18', 'В северной части пещеры',
        'На трупе гигантской росянки, в центре карты',],
    ['В ящике что около входа в форт', 'На трупе гоблина-налетчика', 'На трупе первородной паучихе-матриарха',
        'На трупе во-второй комнате', 'Внутри ящика на уступе холма, на севере локации',
        'Рядом с северо-западным выходом с локации', 'На северном холме, проверка внимания +3',
        'На трупе гидры, в центре карты', 'В сундуке, на северо-восточном холме'
        ,'В трупе первородной гигантской росянки, на северо-восточном холме', 'На холме, в северо-западном углу карты',
        'Недалеко от алтаря Ламашту'],
    ['В самой южной комнате, внутри саркофага', 'В самой южной комнате, внутри второго саркофага',
        'На западе Варнхолда, внутри ящика около дома', 'На ближайшем ко входу складе в западном крыле форта',
        'На соседнем складе в западном крыле форта' ,'Слева от входа', 'В северо-западной комнате',
        'В самой восточной комнате', 'У подножья холма, на юге локации', 'На трупе, что юго-западней ' +
    'северного выхода с локации', 'На трупе кошмарного зомби-циклопа, рядом с северным выходом с локации',
        'Справа от дороги, около северного выхода с локации', 'В самой южной комнате', 'В северной части локации',
        'В самой западной комнате, внутри саркофага', 'В скрытом саркофаге посреди большого зала, что после лабиринта'],
    ['В западном углу, проверка внимания +5', 'В трупе на центральном острове',
        'Сразу после входа в локацию, проверка внимание +28',
        'На трупе кровожадного пожирателя',
        'Часть артефакта находится в иной реальности, попасть туда можно через дверь на локации',
        'В самой западной комнате', 'На трупе медузы-колдуньи', 'Правее факела',
        'На трупе варвара в первом после пещеры коридоре', 'В комнате, что перед спуском на второй уровень',
        'В комнате после подъема с нижнего уровня гробницы, проверка внимание +5',
        'В следующей после подъема с нижнего уровня гробницы комнате', 'В центре карты',
        'За одну комнату перед подъемом на верхний уровень',
        'В самом центре локации, проверка внимания +31', 'В комнате на против центральной'],
    ['На трупе около северо-восточного выхода с локации', 'В комнате с Нирисой',
        'В небольшой комнате соединенной с южным коридором', 'Рядом с восточным выходом с локации',
        'Немного южнее восточного выхода с локации', 'На трупе друида', 'На трупе голема',
        'На трупе голема', 'На трупе Хлада', 'На трупе в северо-восточном углу карты',
        'На трупе в юго-западном углу карты',
        'В северном углу карты', 'В самой южной части причала', 'В спальне на северо-западе',
        'У Наетана, что обитает в комнате стражи в северо-западной части дворца',
        'В одной из спален в восточной части дворца',
        'В спальне Ироветти, вход в нее находится в восточном крыле дворца'],
];
class Menu {
    constructor(options) {
        this._elemMenu = options.elem;
        this.highlightColor = options.highlightColor || 'green';
        this.highlightColorDefault = options.highlightColorDefault || '';
        this.activSvg = this._elemMenu.querySelector('.artifact use');
        this._highlightLock = false;
        this.customEvents = {};
        this.customEvents.highlightIconInLocals = new MouseEvent('highlightIconInLocals', {bubbles: true, cancelable: true});
        this.customEvents.hide = new MouseEvent('hide', {bubbles: true, cancelable: true});
        this.customEvents.change = new MouseEvent('change', {bubbles: true, cancelable: true});
        this.customEvents.show = new MouseEvent('show', {bubbles: true, cancelable: true});
        this.timers = {};
        this._elemMenu.addEventListener('mouseover', this);
        this._elemMenu.addEventListener('mouseout', this);
        this._elemMenu.addEventListener('click', this);
        window.addEventListener('scroll', this);
    }
    handleEvent(e) {
        let target = e.target;
        let svgDoc = target.querySelector('use') || null;
        switch(e.type) {
            case 'mouseout':
                if (target.tagName !== 'LI') return;
                if (this._highlightLock)  return;
                this._highlightOff(svgDoc);
                clearTimeout(this.timers.hide);
                target.dispatchEvent(this.customEvents.show);
                break;
            case 'mouseover':
                if (target.tagName !== 'LI') return;
                if (this._highlightLock)  return;
                this._highlight(svgDoc);
                target.dispatchEvent(this.customEvents.change);
                this.timers.hide = setTimeout (() => target.dispatchEvent(this.customEvents.hide), 400);
                break;
            case 'click' :
                if (target.tagName !== 'LI') return;
                if (this.activSvg !== svgDoc && !this._highlightLock)  {
                    this._highlightLock = true;
                    target.classList.add('scale');
                    this._highlightOff(this.activSvg, true);
                    this._highlight(svgDoc);
                    this._changeActivSvg(svgDoc);
                }else if (this.activSvg === svgDoc && this._highlightLock){
                    this._highlightLock = false;
                    target.classList.remove('scale');
                    target.dispatchEvent(this.customEvents.show);
                    target.dispatchEvent(this.customEvents.change);
                }else if (this.activSvg === svgDoc && !this._highlightLock) {
                    this._highlightLock = true;
                    target.classList.add('scale');
                    target.dispatchEvent(this.customEvents.show);
                    target.dispatchEvent(this.customEvents.change);
                    target.dispatchEvent(this.customEvents.hide);
                }else if (this.activSvg !== svgDoc && this._highlightLock) {
                    this.activSvg.closest('li').classList.remove('scale');
                    target.classList.add('scale');
                    this._highlightOff(this.activSvg, true);
                    this._highlight(svgDoc);
                    target.dispatchEvent(this.customEvents.show);
                    target.dispatchEvent(this.customEvents.change);
                    target.dispatchEvent(this.customEvents.hide);
                    this._changeActivSvg(svgDoc);
                }
                target.dispatchEvent(this.customEvents.highlightIconInLocals);
                break;
            case 'scroll' :
                this._navAnimate();
                break;
        }
    }
    _highlight(svg) {
        svg.setAttribute('fill', this.highlightColor);
    }
    _highlightOff(svg, flag){
        if(flag){
            this.activSvg.setAttribute('fill', this.highlightColorDefault);
            return;
        }
        if (svg.compareDocumentPosition(this.activSvg) == 0) return;
        svg.setAttribute('fill', this.highlightColorDefault);
    }
    _changeActivSvg(svg) {
        this.activSvg  = svg;
    }
    _navAnimate() {
        let svgElem = this._elemMenu.querySelectorAll('svg');
        if (pageYOffset !== 0) {
            if (this._elemMenu.classList.contains('header-scrolled')) return;
            this._elemMenu.classList.add('header-scrolled');
            for (let i = 0; i < svgElem.length; i++) {
                svgElem[i].classList.add('header__icon-black');
            }
        }else{
            this._elemMenu.classList.remove('header-scrolled');
            for (let i = 0; i < svgElem.length; i++) {
                svgElem[i].classList.remove('header__icon-black');
            }
        }
    }
}
class Description {
    constructor(options) {
        this._imgSrc = options.elem.querySelector('.description__img').src;
        this._descriptionTitle = document.querySelector('.artifact__title').innerHTML;
        this._descriptionText = document.querySelector('.artifact__text').innerHTML;
        this.customEvents = {};
        this.customEvents.imgClick = new MouseEvent('imgClick', {bubbles: true, cancelable: true});
        options.elem.addEventListener('click', this);
        document.querySelector('.nav').addEventListener('highlightIconInLocals', this);
        document.querySelector('.nav').addEventListener('show', this);
        document.querySelector('.nav').addEventListener('change', this);
    }
    handleEvent(e) {
        let target = e.target;
        let svgDoc = target.querySelector('use') || null;
        switch(e.type) {
            case 'show':
                this._changeDescription(this._descriptionTitle, this._descriptionText);
                this._changeImg();
                break;
            case 'change':
                this._changeDescription(target.querySelector('.artifact__title').innerHTML
                    , target.querySelector('.artifact__text ').innerHTML);
                this._changeImg(svgDoc);
                break;
            case 'highlightIconInLocals':
                this._saveImg();
                this._saveDescription();
                break;
            case 'click' :
                if (target.tagName === 'IMG') {
                    target.dispatchEvent(this.customEvents.imgClick);
                    break;
                }
                break;
        }
    }
    _changeDescription(title, text) {
        document.getElementsByClassName('description__title')[0].innerHTML = title;
        document.getElementsByClassName('description__text')[0].innerHTML = text;
    }
    _changeImg(target) {
        if(target) {
            const src = `img/screenshots/${target.href.baseVal.split('#')[1]}.jpg`;
            document.querySelector('.description__img').setAttribute('src', src);
        }else{
            document.querySelector('.description__img').setAttribute('src', this._imgSrc);
        }
    }
    _saveImg() {
        this._imgSrc = document.querySelector('.description__img').src;
    }
    _saveDescription(){
        this._descriptionTitle = document.getElementsByClassName('description__title')[0].innerHTML;
        this._descriptionText = document.getElementsByClassName('description__text')[0].innerHTML;
    }
}
class Locals {
    constructor(options) {
        this._elem = options.elem;
        this._artifactMap = options.artifactMap;
        this._artifactIndex = options.artifactIndex;
        this._localsItemsCurentState = Array.prototype.slice.call(this._elem.querySelectorAll('li'));
        this._localsItemsOriginalState = Array.prototype.slice.call(this._elem.querySelectorAll('li'));
        this.highlightColor = options.highlightColor || 'green';
        this._lastChangeIconArr = [];
        this.highlightColorDefault = options.highlightColorDefault || '';
        this.customEvents = {
            'over': new MouseEvent('mouseoverLocalsIcon', {bubbles: true, cancelable: true}),
            'out': new MouseEvent('mouseoutLocalsIcon', {bubbles: true, cancelable: true}),
            'dblclick':  new MouseEvent('dblclickLocalsIcon', {bubbles: true, cancelable: true}),
        };
        this.touchstartDate = 0;
        this._timers = {};
        document.querySelector('.nav').addEventListener('highlightIconInLocals', this);
        document.querySelector('.nav').addEventListener('show', this);
        document.querySelector('.nav').addEventListener('hide', this);
        document.addEventListener('changeStatusLocalsIcon', this);
        options.elem.addEventListener('mouseover', this);
        options.elem.addEventListener('mouseout', this);
        options.elem.addEventListener('dblclick', this);
        options.elem.addEventListener('touchstart', this);
        options.elem.addEventListener('touchend', this);
    }
    handleEvent(e){
        const target = e.target;
        switch(e.type) {
            case 'mouseover':
                this._timers.over = setTimeout(() => target.dispatchEvent(this.customEvents.over), 100);
                break;
            case 'mouseout':
                clearTimeout(this._timers.over);
                if (target.closest('.locals__tooltip')|| target.classList.contains('locals__wrap')) return;
                target.dispatchEvent(this.customEvents.out);

                break;
            case 'highlightIconInLocals' :
                const id ='.' + target.querySelector('use').href.baseVal.split('#')[1];
                this._highlightOff();
                this._highlight(id);
                break;
            case 'hide' :
                const d = target.querySelector('use').href.baseVal.split('#')[1];
                this._hideListItem(d);
                this._timers.hide = setTimeout(() => {
                    this._shiftList();
                    this._showListAnimation();
                    this._shiftListChangeFocus();
                }, 450);
                this._shiftListAnimation();
                break;
            case 'show':
                this._localsItemsCurentState.map(this._showListItem);
                clearTimeout(this._timers.hide);
                this.listToOriginalState();
                this._shiftListAnimationOff();
                break;
            case 'dblclick':
                target.dispatchEvent(this.customEvents.dblclick);
                break;
            case 'changeStatusLocalsIcon':
                this._changeStateLocalStorage(e);
                break;
            case 'touchstart' :
                this.touchstartDate = new Date;
                this._timers.touchstart = setTimeout(
                    () => target.dispatchEvent(this.customEvents.dblclick), 470);
                break;
            case 'touchend' :
                if (target.classList.contains('locals__wrap') && new Date - this.touchstartDate > 470) {
                    e.preventDefault();
                }
                clearTimeout(this._timers.touchstart);
                break;
        }
    }
    _changeStateLocalStorage(e) {
        const target = e.target.querySelector('use');
        if(e.detail){
            target.setAttribute('fill', 'green');
        }else{
            target.setAttribute('fill', 'black');
        }
    }
    renderArtifactIcons() {
        for (let i = 0; i < this._artifactMap.length; i++) {
            for (let j = 0; j < this._artifactMap[i].length; j++) {
                this._localsItemsCurentState[this._artifactMap[i][j]]
                    .append(this._createSvgItems(this._artifactIndex[i], j, i));
            }
        }
    }
    _createSvgItems(artifact, itemIndex, artifactIndex) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        let wrap = document.createElement('div');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            `img/sprite.svg#${artifact}`);
        use.dataset.imgSrc =`${artifactIndex}-${itemIndex}`;
        svg.append(use);
        svg.classList.add(artifact);
        wrap.classList.add('locals__wrap');
        wrap.append(svg);
        return wrap;
    }
    _highlight(iconId) {
        let iconArr = this._lastChangeIconArr = this._elem.querySelectorAll(iconId);
        for (let i = 0; i < iconArr.length; i++) {
            iconArr[i].setAttribute('fill', this.highlightColor);
        }
    }
    _highlightOff() {
        for (let i = 0; i < this._lastChangeIconArr.length; i++) {
            this._lastChangeIconArr[i].setAttribute('fill', this.highlightColorDefault);
        }
    }
    _hideListItem(id) {
        let artifactIndex = this._artifactMap[this._artifactIndex.indexOf(id)];
        let visibleList = [...new Set(artifactIndex)];
        for (let i = 0; i < this._localsItemsCurentState.length; i++) {
            if (visibleList.includes(i)) {
                this._localsItemsCurentState[i].classList.add('hide--anim');
            }else{
                this._localsItemsCurentState[i].classList.add('hide');
            }
        }
    }
    _showListItem(elem) {
        elem.classList.remove('hide', 'hide--anim');
    }
    // sortList() {
    //     this._localsItemsCurentState.sort(function (a, b) {
    //         if (a.firstChild.innerHTML < b.firstChild.innerHTML) return -1;
    //         if (a.firstChild.innerHTML > b.firstChild.innerHTML) return 1;
    //         return 0;
    //     });
    //     this._renderList();
    // }
    _renderList(originalState) {
        let ul = this._elem.querySelectorAll('.locals__group');
        if (originalState)  {
            ul[0].append(...this._localsItemsOriginalState.slice(0, 29));
            ul[1].append(...this._localsItemsOriginalState.slice(29));
        }else{
            ul[0].append(...this._localsItemsCurentState.slice(0, 29));
            ul[1].append(...this._localsItemsCurentState.slice(29));
        }
    }
    _shiftListAnimation() {
        this._localsItemsCurentState = Array.prototype.slice.call(this._elem.querySelectorAll('li'));
        if (document.documentElement.clientWidth <= 575) {
            for (let i = 0; i < this._localsItemsCurentState.length; i++) {
                this._localsItemsCurentState[i].classList.add('locals--shift-left');
            }
        }else{
            for (let i = 0; i < this._localsItemsCurentState.length; i++) {
                if (i < 29) {
                    this._localsItemsCurentState[i].classList.add('locals--shift-left');
                }else{
                    this._localsItemsCurentState[i].classList.add('locals--shift-right');
                }
            }
        }
        setTimeout(() => {
            let animetedListItem = this._elem.querySelectorAll('.hide--anim');
            for (let i = 0; i < animetedListItem.length; i++) {
                animetedListItem[i].classList.remove('hide--anim');
            }
            this._shiftListAnimationOff();
        }, 475)
    }
    _shiftListAnimationOff() {
        this._localsItemsCurentState = Array.prototype.slice.call(this._elem.querySelectorAll('li'));
        for (let i = 0; i < this._localsItemsCurentState.length; i++) {
            if (this._localsItemsCurentState[i].classList.contains('hide--anim')) break;
            if (this._localsItemsCurentState[i].classList.contains('locals--shift-left')){
                this._localsItemsCurentState[i].classList.remove('locals--shift-left');
            }
            if(this._localsItemsCurentState[i].classList.contains('locals--shift-right')){
                this._localsItemsCurentState[i].classList.remove('locals--shift-right');
            }
        }
    }
    _shiftListChangeFocus() {
        let firstLiCords = this._elem.querySelector('li').getBoundingClientRect();
        if (firstLiCords.top <= 0 || firstLiCords.top > document.documentElement.clientHeight) {
            window.scrollTo({top: firstLiCords.y + pageYOffset - 200, behavior: "smooth"});
        }
    }
    _showListAnimation() {
        for (let i = 0; i < this._localsItemsCurentState.length; i++) {
            if (!this._localsItemsCurentState[i].classList.contains('hide--anim')) break;
            if (this._localsItemsCurentState[i].classList.contains('locals--shift-left')){
                this._localsItemsCurentState[i].classList.remove('locals--shift-left');
            }
            if(this._localsItemsCurentState[i].classList.contains('locals--shift-right')){
                this._localsItemsCurentState[i].classList.remove('locals--shift-right');
            }
        }
        for (let i = 0; i < this._localsItemsCurentState.length; i++) {
            if (this._localsItemsCurentState[i].classList.contains('hide--anim')) {
                this._localsItemsCurentState[i].classList.add('locals--shift-left');
            }
        }
    }
    _shiftList() {
        let hidenArray = [];
        let visibleArray = [];
        for (let i = 0; i < this._localsItemsCurentState.length; i ++) {
            if (this._localsItemsCurentState[i].classList.contains('hide--anim')) {
                visibleArray.push(this._localsItemsCurentState[i]);
            }else{
                hidenArray.push(this._localsItemsCurentState[i]);
            }
        }
        this._localsItemsCurentState = visibleArray.concat(hidenArray);
        this._renderList();
    }
    // _anim() {
    //     this._localsItemsCurentState.forEach(function (item) {
    //         if(item.classList.contains('locals--anim')) item.classList.remove('locals--anim');
    //     })
    // }
    listToOriginalState() {
        this._renderList(true);
    }
}
class ToolTip {
    constructor(){
        this._textToToolTip = textToToolTIp;
        this._lastTooltip = null;
        this.customEvents = {};
        this.timers = {};
        this.customEvents.imgClick = new MouseEvent('imgClick', {bubbles: true, cancelable: true});
        document.querySelector('.locals').addEventListener('mouseoverLocalsIcon', this);
        document.querySelector('.locals').addEventListener('mouseoutLocalsIcon', this);
        document.addEventListener('click', this);
    }
    handleEvent(e){
        const target = e.target;
        switch(e.type) {
            case 'mouseoverLocalsIcon':
                if (!target.classList.contains('locals__wrap')) return;
                // this.timers.show = setTimeout(() => this._showToolTip(target), 700 );
                this._showToolTip(target);
                break;
            case 'mouseoutLocalsIcon':
                this._hide();
                break;
            case 'click':
                if(target.tagName == 'IMG') target.dispatchEvent(this.customEvents.imgClick);
                if (!target.classList.contains('locals__wrap')) this._hide();
                break;
            case 'mouseover':
                if (target.classList.contains('tooltip__text--sliced')){
                    this._showOverflowText();
                }
                break;
            case 'mouseenter':
                this._lastTooltip.addEventListener('mouseleave', this);
                break;
            case 'mouseleave':
                this._hide();
                break;
            }
        }
    _showToolTip(target) {
        if (this._lastTooltip) {
            this._hide();
        }
        let toolTip = this._create(target.querySelector('use').dataset.imgSrc);
        let textElem = toolTip.querySelector('.tooltip__text');
        this._lastTooltip = toolTip;
        target.append(toolTip);
        this._calcPosition(toolTip);
        this._lastTooltip.addEventListener('mouseenter', this);
        this._lastTooltip.addEventListener('mouseover', this);
        if (textElem.offsetHeight > 45) {
            function strToHeight () {
                if (textElem.offsetHeight > 45){
                    textElem.innerHTML = textElem.innerHTML.slice(0, -1);
                    strToHeight();
                }
            }
            strToHeight();
            textElem.innerHTML = `${textElem.innerHTML.slice(0, -4)}...`;
            textElem.classList.add('tooltip__text--sliced');
        }
    }
    _showOverflowText() {
        let textElem = this._lastTooltip.querySelector('.tooltip__text--sliced');
        this._lastTooltip.classList.add('tooltip-overflow-text');////////////!!!!
        setTimeout(() => {
            let src = this._lastTooltip.parentElement.querySelector('use').dataset.imgSrc;
            let textIndex = src.split('-');
            this._lastTooltip.querySelector
            ('.tooltip__text').innerHTML = this._textToToolTip[textIndex[0]][textIndex[1]];
            textElem.classList.remove('tooltip__text--sliced');
        }, 100);
    }
    _calcPosition(toolTip) {
        let coordsToolTip = toolTip.getBoundingClientRect();
        let left = -150;
        let top = -273;
        if (coordsToolTip.left - 150 <= 0){
            left = Math.abs(coordsToolTip.left - 150) + left + 20;
        }else if(coordsToolTip.right - 150 >= document.documentElement.clientWidth){
            left = left - Math.abs(coordsToolTip.left - 150) + 20;
        }
        if (coordsToolTip.top - 244 <= 40) {
            top = 40;
        }
        toolTip.style.left = `${left}px`;
        toolTip.style.top = `${top}px`;
    }
    _hide() {
        if (!this._lastTooltip) return;
        let toolTip = document.querySelector('.locals__tooltip');
        toolTip.remove();
        this._lastTooltip = null;
    }
    _create(src) {
        let toolTip = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement('span');
        let alt = 'Скриншот локации с артефактом';
        let textIndex = src.split('-');
        toolTip.classList.add('locals__tooltip');
        img.setAttribute('src', `img/screenshots/${src}.jpg`);
        img.setAttribute('alt', alt);
        text.classList.add('tooltip__text');
        text.innerHTML = this._textToToolTip[textIndex[0]][textIndex[1]] || 'Undefined';
        img.classList.add('tooltip__img');
        toolTip.append(img);
        toolTip.append(text);
        return toolTip;
    }
}
class ModalWindow {
    constructor(options) {
        this.modal = document.createElement('div');
        this.modal.classList.add('modal-window');
        this.modal.addEventListener('click', this);
        document.addEventListener('imgClick', this);
    }
    handleEvent(e) {
        const target = e.target;
        switch(e.type) {
            case 'click' :
                this.hide();
                break;
            case 'imgClick':
                this._renderFullSizeImg(target);
                break;
        }
    }
    hide() {
        this.modal.innerHTML = '';
        this.modal.remove();
    }
    _renderFullSizeImg(target) {
        if (this.modal.childElementCount > 0) return;
        this.modal.append(this._createFullSizeImg(target));
        this.init();
    }
    _createFullSizeImg(target) {
        let img = document.createElement('img');
        let targetSrc = target.src.split('.')[0];
        img.classList.add('modal-window__img', 'img-fluid');

        img.src = `${targetSrc}-full.jpg`;
        return img;
    }
    init() {
        document.body.append(this.modal);
    }
}
class InfoWindow {
    constructor() {
        this.info = document.querySelector('.info');
        this.info.addEventListener('click', this);
    }
    handleEvent(e) {
        const target = e.target;
        if (target.tagName !== 'BUTTON') return;
        if (target.name === 'ok') {
            this.info.classList.add('hide');
        }else{
            this.info.classList.add('hide');
            localStorage.setItem('notDisplayInfo', JSON.stringify(true));
            this.init();
        }
    }
    init() {
        const display = JSON.parse(localStorage.getItem('notDisplayInfo'));
        if (!display){
            this.info.classList.remove('hide');
        }else{
            this.info.classList.add('hide');
        }
    }
}
class LocalStorageHandler {
    constructor() {
        document.addEventListener('dblclickLocalsIcon', this);
    }
    handleEvent(e) {
        switch(e.type) {
            case 'dblclickLocalsIcon':
                this._dblclickHandler(e);
                break;
            case 'click':
                break;
        }
    }
    _dblclickHandler (e) {
        const target = e.target;
        if (!target.classList.contains('locals__wrap')) return;
        let artAndPos = target.querySelector('use').dataset.imgSrc.split('-');
        let arr = JSON.parse(localStorage.getItem('artifacts'));
        if (!arr[artAndPos[0]][artAndPos[1]]) {
            arr[artAndPos[0]][artAndPos[1]] = true;
        }else{
            arr[artAndPos[0]][artAndPos[1]] = false;
        }
        localStorage.setItem('artifacts', JSON.stringify(arr));
        this.customEvents = {'changeStatus': new MouseEvent('changeStatusLocalsIcon',
                {bubbles: true, cancelable: true, detail: arr[artAndPos[0]][artAndPos[1]]}),};
        target.dispatchEvent(this.customEvents.changeStatus);
    }
    init () {
        const arr = JSON.parse(localStorage.getItem('artifacts'));
        for (let i = 0; i < arr.length; i++) {
            for (let key in arr[i]) {
                if (arr[i][key]) document.querySelector(`[data-img-src="${[i]}-${[key]}"]`).
                setAttribute('fill', 'green');
            }

        }
    }
}
const description = new Description({
    elem: document.querySelector('.description')
});
const menu = new Menu({
    elem: document.querySelector('.header'),
    highlightColor: highlightColor,
    artifactIndex
});
const locals = new Locals({
    elem: document.getElementsByClassName('locals')[0],
    artifactMap,
    artifactIndex,
    highlightColor: highlightColor
});
const tooltip = new ToolTip(textToToolTIp);
const localStorageHandler = new LocalStorageHandler();
locals.renderArtifactIcons();
if (!localStorage.getItem('artifacts')){
    localStorage.setItem('artifacts', JSON.stringify([{0:false},{0:false},{0:false},{0:false},
        {0:false},{0:false},{0:false}]));
}
localStorageHandler.init();
const modal = new ModalWindow();
const info = new InfoWindow();
info.init();



