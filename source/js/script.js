class App {
  init() {
    this.onButtonPlay();
    this.isPolicyChecked();
    this.initRange();
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

  initRange() {
    const butns = document.querySelectorAll('.profit-btn')
    const calcValue = document.querySelector('#calcResult')
    const profitValue = document.querySelector('#profitValue')
    let month = 6

    const getValueFromText = (text) => {
      return parseInt(text.replace(/[\s€]/g, ""));
    }

    const setMonth = (amount) => {
      month = +amount
    }

    const resetBtnsStyles = () => {
      butns.forEach((b) => { b.classList.remove('profit-btn--active') })
    }

    const getMulti = (month) => {
      if (month === 0) {
        return 1.52;
      }

      if (month === 1) {
        return 1.92;
      }

      if (month === 6) {
        return 2.32;
      }

      if (month === 12) {
        return 2.72;
      }
    };

    butns.forEach((b) => {
      b.addEventListener('click', () => {
        resetBtnsStyles()
        b.classList.add('profit-btn--active')
        setMonth(b.id);
        profitValue.innerText = (Math.round(getValueFromText(calcValue.innerText) * getMulti(month)) + ' €')
      });
    });

    $(function () {
      $(".js-range-slider").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: true,
        min: 250,
        max: 10000,
        from: 1400,
        postfix: " €",
        grid: false,
        prettify: function (value) {
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
        onStart: function (data) {
          $("#calcResult").text(data.from.toString() + ' €');
        },
        onChange: function (data) {
          $("#profitValue").text(Math.round(data.from * getMulti(month)) + ' €');
          $("#calcResult").text(data.from.toString() + ' €');
        },
      });
    });
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
