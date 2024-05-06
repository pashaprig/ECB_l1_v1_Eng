class App {
  init() {
    this.onButtonPlay();
    this.isPolicyChecked();

  }

  constructor() {
    this.iframe = document.querySelector('iframe');
    this.player = new Vimeo.Player(this.iframe);
    this.btnPlay = document.querySelector('#button-play')
    this.videoBcg = document.querySelector('.video__img')
  }


  onButtonPlay() {
    const playVideo = () => {
      this.player.play()
      this.btnPlay.style.display = 'none'
      this.videoBcg.style.display = 'none'
    }

    this.btnPlay.addEventListener('click', playVideo);
  }

    isPolicyChecked() {
    const leadform1 = document.querySelector('#leadform1');
    const leadform2 = document.querySelector('#leadform2');

    const isChecked = (form) => {
      const policyCheck = form.querySelector('[name="polycy"]')
      const termsCheck = form.querySelector('[name="terms"]')
      const sbmtBtn = form.querySelector('.submit_btn')


      const checkPolicy = () => {
        if (policyCheck.checked && termsCheck.checked) {
          sbmtBtn.removeAttribute("disabled");
        } else {
          sbmtBtn.setAttribute("disabled", "disabled");
        }
      };

      policyCheck.addEventListener('click', checkPolicy);
      termsCheck.addEventListener('click', checkPolicy);
      checkPolicy()
    }

    [leadform1, leadform2].forEach((f) => { f.addEventListener('click', isChecked(f)) })
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
