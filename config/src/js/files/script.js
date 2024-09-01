// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

// ! КАЛЕНДАРЬ
/* Календарь */
// https://github.com/qodesmith/datepicker#installation
import datepicker from "js-datepicker";

// ! для паралакса фона и декора  ,Линии,   БРЕД НЕ ТУДА НАПИСАЛ
window.addEventListener("load", function (e) {
  const bg = document.querySelectorAll("[data-bg]");
  if (bg.length) {
    bg.forEach((bgItem) => {
      bgItem.insertAdjacentHTML("beforeend", `<div class="bg-item"></div>`);
    });
  }

  const picker = datepicker("[data-calendar]", {
    //customDays: ['天', '一', '二', '三', '四', '五', '六']
  });
  // ? тут проверяем есть ли у нас нужный блок
  if (document.querySelector(".video-module")) {
    // ? здесь наблюдатель (watcher) отлавливает момент появления обьекта на экране
    document.addEventListener("watcherCallback", function (e) {
      // ? тут мы получаем в const обьект который отследил наблюдатель
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (
        targetElement.dataset.watch === "video" &&
        !targetElement.classList.contains("_init")
      ) {
        if (entry.isIntersecting) {
          // Видим объект
          //  ?при скроле и появлении видео оно автоматически воспроизводится
          targetElement.querySelector("video").play();
        } else {
          // Не видим объект
          //  ?когда видео не в области нашего зрения, оно ставится на паузу само
          targetElement.querySelector("video").pause();
        }
      }
    });
    //  ?для запуска основного второго видео
    // ? вешаем событие click на обьект videoModule
    const videoModule = document.querySelector(".video-module");
    videoModule.addEventListener("click", function (e) {
      if (!videoModule.classList.contains("_init")) {
        // ?здесь мы заменяем вступительное-превью видео(src) на основное дата-фул (dataset.full)
        videoModule.querySelector("video").src =
          videoModule.querySelector("video").dataset.full;
        //  ? вешаем класс _active по которому убираем черно-белое и кнопку плэй
        videoModule.classList.add("_active");
        //   ? добавляем класс_init чтоб переключить весь наш функцианал
        videoModule.classList.add("_init");
        //   ? запускаем видео (play) и убираем (muted) тем самым вкл звук
        videoModule.querySelector("video").play();
        videoModule.querySelector("video").muted = false;
      } else {
        // ? здесь проверяем если видео на паузе то (play) если (play) та на паузу(paused)
        if (videoModule.querySelector("video").paused) {
          videoModule.querySelector("video").play();
        } else {
          videoModule.querySelector("video").pause();
        }
        //   ? показать или убрать кнопку плэй
        videoModule.classList.toggle("_active");
      }
    });
  }
});
