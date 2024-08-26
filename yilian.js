let hasGetCapturePremission = false;

function once(fn, context) {
  var result;
  // 注意，此处为了防止，并发，加了sync。
  return sync(function () {
    if (fn) {
      log("执行一次");
      result = fn.apply(context || this, arguments);
      fn = null;
    } else {
      // log("已经执行")
    }
    return result;
  });
}

let OCR = {
  autoPermisionScreenCapture: once(function () {
    if (hasGetCapturePremission) {
      log("当前有截图权限");
      return;
    }

    console.log("自动申请截图权限");
    let Thread = threads.start(function () {
      if (auto.service == null) {
        toast("无障碍未开启");
        return;
      }

      let ele = textMatches(
        /(.*录屏或投屏.*|.*录制或投射.*|允许|立即开始|统一)/
      ).findOne(10 * 1000);

      if (ele == null) {
        // toast("未能发现截图权限弹窗")
        return;
      }
      log("已经弹出权限确认界面");

      let eles = textMatches(
        /(.*录屏或投屏.*|.*录制或投射.*|允许|立即开始|统一)/
      ).find();

      if (eles.empty()) {
        // toast("未能发现截图权限弹窗")
        return;
      }

      let notMiui14Style = false;
      for (let e of eles) {
        let text = e.text();
        if (
          text.indexOf("立即开始") > 0 ||
          text.indexOf("允许") > 0 ||
          text.indexOf("统一")
        ) {
          notMiui14Style = true;
          break;
        }
      }

      if (notMiui14Style) {
        log("可以找到立即开始");
        let allowEle = textMatches(/(允许|立即开始|统一)/).findOne(10 * 1000);
        if (allowEle) {
          sleep(1500);
          if (allowEle.clickable()) {
            log("点击 元素");
            let ok = allowEle.click();
            return ok;
          } else {
            let b = allowEle.bounds();
            log("按压 坐标");
            return press(b.centerX(), b.centerY(), 1);
          }
        }
      } else {
        //  在miui 14中，立即开始，不可找到。使用推测的方式来处理
        log("推测 立即开始 坐标");

        let cancel = text("取消").findOne(10 * 10000);
        if (cancel) {
          log("取消 按钮 存在");
          let x = device.width - cancel.bounds().centerX();
          let y = cancel.bounds().centerY();

          log("点击 推测坐标 %s %s", x, y);
          sleep(500);
          press(x, y, 1);
        } else {
          log("取消按钮不存在，推测失败");
        }
      }
    });

    log("申请权限");

    //在一个会话中，调用两次申请截图权限。就会卡死。
    if (!requestScreenCapture(false)) {
      toast("请求截图权限失败");
      return false;
    } else {
      Thread.interrupt();
      log("已获得截图权限");
      hasGetCapturePremission = true;
      return true;
    }
  }),
  getPostionByOCR: function (x, y, w, h) {
    this.autoPermisionScreenCapture();
    var img = captureScreen(); // 截取当前屏幕图像
    var clip = images.clip(img, x, y, w, h); // 裁剪图像
    let res = paddle.ocr(clip);
    // [ OcrResult(confidence=0.93765306, preprocessTime=15.0, inferenceTime=465.0, text=20:35, bounds=Rect(85, 37 - 303, 85)),
    //   OcrResult(confidence=0.696329, preprocessTime=15.0, inferenceTime=465.0, text=g4, bounds=Rect(739, 35 - 1020, 87))]
    return res;
  },
};

OCR.autoPermisionScreenCapture();

sleep(5 * 1000);

function getData() {
  let res = OCR.getPostionByOCR(0, 0, device.width, device.height);
  // log(res);

  let dataPostion = 0;
  let data = {};
  for (let r of res) {
    // todo
    order.use_date = r.text;

    if (r.text && r.text.indexOf("收益（元）") > -1) {
      dataPostion = 1;
      continue;
    }

    if (dataPostion == 0) {
      continue;
    }

    //有时候下一个是航班号。
    if (dataPostion == 1 && r.text.indexOf("航班号") > -1) {
      log("包含航班号");
      continue;
    }

    if (dataPostion == 1) {
      log("里程 %s km", r.text);
      data.km = r.text;
    } else if (dataPostion == 2) {
      //   log("预计用时 %s", r.text);
      //   data.kmTime = r.text;
    } else if (dataPostion == 3) {
      log("收益 %s 元", r.text);
      data.price = r.text;
    } else if (r.text == "抢单") {
      log("找到抢单按钮");
      data.qiangBounds = r.bounds;
      break;
    }

    dataPostion++;
  }

  log(data);

  return data;
}

// getData();

let yilian = {
  isAlert() {
    while (1) {
      sleep(500); //时间别太长，也别太短。太长费手机，太短速度达不到

      if (text("出车中...").findOnce()) {
        // 位于这个界面，才进行截图判断。
      } else {
        // 可能是弹出框了。
        // 如果出现，找不到任何元素的界面。就认为是弹出框了。
        let eles = visibleToUser(true)
          .boundsInside(0, 0, device.width - 1, device.height - 1)
          .find();
        if (eles == null) {
          log("可能弹出订单");
          log("截图分析");
        }
      }
    }
  },
};
