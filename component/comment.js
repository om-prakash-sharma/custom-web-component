const template = document.createElement('template');
template.innerHTML = `
    <style>
        div.comment-section{
            height: 210px;
            background: #dadada;
        }
        textarea#comment-area{
            width: calc(100% - 80px);
            height: 80px;
            padding: 20px;
            margin: 20px;
        }
        span.time{
            margin-left: 20px;
        }
        div.btn-section{
            float: right;
            margin-right: 20px;
        }
        button{
            width: 140px;
            height: 35px;
            border: 0px;
            font-size: medium;
        }
        button:focus{
            border: none;
            outline-color: transparent;
            background: #abc1c1;
        }
        button:hover{
            background: #1e7575;
            color: #ff0;
            font-size: large;
        }
    </style>
    <div class="comment-section">
        <textarea id="comment-area" placeholder="type your comment here .."></textarea>
        <span class="time"></span>
        <div class="btn-section">
            <button id="clearBtn">Clear</button>
            <button id="searchBtn">Add comment</button>
        </div>
    </div>`;

class CommentBox extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._textArea = this.shadowRoot.querySelector('#comment-area');
        this._btnGroup = this.shadowRoot.querySelector('.btn-section');
        this.shadowRoot.querySelector('span.time').innerHTML = new Date();
    }

    handleEvent(event) {
        if (event) {
            const eventType = (event.target.id || "").toUpperCase();
            if (eventType === 'CLEARBTN') {
                this._textArea.value = "";
                this.dispatchEvent(new CustomEvent("onSearchText", {
                    detail: this._textArea.value
                }));
            }

            if (eventType === 'SEARCHBTN') {
                this.dispatchEvent(new CustomEvent("onSearchText", {
                    detail: this._textArea.value
                }));
            }
        }
    }

    connectedCallback() {
        this._btnGroup.addEventListener('click', (e) => this.handleEvent(e));
    }

    disconnectedCallback() {
        this._btnGroup.removeEventListener('click', (e) => { });
    }
}

window.customElements.define('comment-box', CommentBox)