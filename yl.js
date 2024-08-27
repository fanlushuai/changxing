"ui";

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

const OCR = {
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

ui.layout(
  <frame w="*" h="*" bg="#F6FFE3" gravity="center">
    <vertical>
      <ScrollView>
        <vertical marginTop="30">
          <vertical marginLeft="30" marginRight="30" marginTop="20">
            <Switch
              id="autoService"
              text="无障碍服务"
              textStyle="bold"
              textColor="#000000"
              textSize="16sp"
              checked="{{auto.service!=null}}"
            />
            <vertical marginTop="16">
              <Switch
                id="conditionPowerOrder"
                text="开启优选订单"
                textStyle="bold"
                textColor="#000000"
                textSize="16sp"
                checked="false"
              />

              <text textColor="red" text="任意条件匹配即可" />

              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbPowerOrder1"></checkbox> <text text="全程≤ [" />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxKm1"
                  w="60"
                  gravitry="center"
                />{" "}
                <text text="] 公里，金额 ≥ " />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minPrice1"
                  w="80"
                  gravitry="center"
                />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbPowerOrder2"></checkbox> <text text="全程≤ [" />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxKm2"
                  w="60"
                  gravitry="center"
                />{" "}
                <text text="] 公里，金额 ≥ " />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minPrice2"
                  w="80"
                  gravitry="center"
                />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbPowerOrder3"></checkbox> <text text="全程≤ [" />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxKm3"
                  w="60"
                  gravitry="center"
                />{" "}
                <text text="] 公里，金额 ≥ " />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minPrice3"
                  w="80"
                  gravitry="center"
                />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbPowerOrder4"></checkbox> <text text="全程≤ [" />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxKm4"
                  w="60"
                  gravitry="center"
                />{" "}
                <text text="] 公里，金额 ≥ " />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minPrice4"
                  w="80"
                  gravitry="center"
                />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbPowerOrder5"></checkbox> <text text="全程≤ [" />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxKm5"
                  w="60"
                  gravitry="center"
                />{" "}
                <text text="] 公里，金额 ≥ " />{" "}
                <input
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minPrice5"
                  w="80"
                  gravitry="center"
                />{" "}
              </horizontal>

              <Switch
                id="conditionTimeRange"
                marginTop="14"
                text="开启指定时间"
                textStyle="bold"
                textColor="#000000"
                textSize="16sp"
                checked="false"
              />
              <text textColor="red" text="任意条件匹配即可" />

              <horizontal marginTop="14" gravity="center">
                {" "}
                <checkbox id="cbTimeRange1"></checkbox> <text text="今天 [" />{" "}
                <input
                  text="0"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minTime1"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="," />{" "}
                <input
                  text="24"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxTime1"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="] (24小时)" />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbTimeRange2"></checkbox> <text text="明天 [" />{" "}
                <input
                  text="0"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minTime2"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="," />{" "}
                <input
                  text="24"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxTime2"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="] (24小时)" />{" "}
              </horizontal>
              <horizontal marginTop="0" gravity="center">
                {" "}
                <checkbox id="cbTimeRange3"></checkbox> <text text="后天 [" />{" "}
                <input
                  text="0"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="minTime3"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="," />{" "}
                <input
                  text="24"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxTime3"
                  w="40"
                  gravitry="center"
                />{" "}
                <text text="] (24小时)" />{" "}
              </horizontal>

              <horizontal marginTop="14" gravity="center" w="*" h="*">
                <button
                  id="save"
                  marginLeft="10"
                  marginRight="20"
                  bg="#23A9F2"
                  text="保存"
                />

                <button
                  id="bt"
                  marginLeft="20"
                  marginRight="10"
                  bg="#23A9F2"
                  text="启动"
                />
              </horizontal>
            </vertical>

            <vertical marginTop="30" marginLeft="20">
              <text> </text>
              <text> 1. 开启无障碍 </text>
              <text> 2. 填入内容</text>
              <text> 3. 点击启动</text>
              <text> 4. 手动切换到'易联车主出车中...'界面。等待自动抢单。</text>
            </vertical>
          </vertical>
        </vertical>
      </ScrollView>
    </vertical>
  </frame>
);

const CF = {
  conditionPowerOrder: false,
  maxKm1: 100000,
  maxKm2: 100000,
  maxKm3: 100000,
  maxKm4: 100000,
  maxKm5: 100000,
  minPrice1: -1,
  minPrice2: -1,
  minPrice3: -1,
  minPrice4: -1,
  minPrice5: -1,
  cbPowerOrder1: false,
  cbPowerOrder2: false,
  cbPowerOrder3: false,
  cbPowerOrder4: false,
  cbPowerOrder5: false,

  conditionTimeRange: false,
  cbTimeRange1: false,
  cbTimeRange2: false,
  cbTimeRange3: false,
  minTime1: 0,
  minTime2: 0,
  minTime3: 0,
  maxTime1: 24,
  maxTime2: 24,
  maxTime3: 24,
  getStorage: function () {
    // 更新表单内容，到本地内存
    return storages.create("yl342343243");
  },
  loadForm: function () {
    // 将本地存储内容，加载到表单上面
    let configStorage = this.getStorage();

    let conditionPowerOrder = configStorage.get("conditionPowerOrder");
    if (conditionPowerOrder) {
      log("conditionPowerOrder %s", conditionPowerOrder);
      ui.conditionPowerOrder.setChecked(conditionPowerOrder);
    }
    let maxKm1 = configStorage.get("maxKm1");
    if (maxKm1) {
      log("maxKm1 %s", maxKm1);
      ui.maxKm1.setText(maxKm1 + "");
    }
    let maxKm2 = configStorage.get("maxKm2");
    if (maxKm2 && maxKm2 != "") {
      log("maxKm2 %s", maxKm2);
      ui.maxKm2.setText(maxKm2 + "");
    }
    let maxKm3 = configStorage.get("maxKm3");
    if (maxKm3) {
      log("maxKm3 %s", maxKm3);
      ui.maxKm3.setText(maxKm3 + "");
    }
    let maxKm4 = configStorage.get("maxKm4");
    if (maxKm4) {
      log("maxKm4 %s", maxKm4);
      ui.maxKm4.setText(maxKm4 + "");
    }
    let maxKm5 = configStorage.get("maxKm5");
    if (maxKm5) {
      log("maxKm5 %s", maxKm5);
      ui.maxKm5.setText(maxKm5 + "");
    }
    let minPrice1 = configStorage.get("minPrice1");
    if (minPrice1) {
      log("minPrice1 %s", minPrice1);
      ui.minPrice1.setText(minPrice1 + "");
    }
    let minPrice2 = configStorage.get("minPrice2");
    if (minPrice2) {
      log("minPrice2 %s", minPrice2);
      ui.minPrice2.setText(minPrice2 + "");
    }
    let minPrice3 = configStorage.get("minPrice3");
    if (minPrice3) {
      log("minPrice3 %s", minPrice3);
      ui.minPrice3.setText(minPrice3 + "");
    }
    let minPrice4 = configStorage.get("minPrice4");
    if (minPrice4) {
      log("minPrice4 %s", minPrice4);
      ui.minPrice4.setText(minPrice4 + "");
    }
    let minPrice5 = configStorage.get("minPrice5");
    if (minPrice5) {
      log("minPrice5 %s", minPrice5);
      ui.minPrice5.setText(minPrice5 + "");
    }
    let cbPowerOrder1 = configStorage.get("cbPowerOrder1");
    if (cbPowerOrder1) {
      log("cbPowerOrder1 %s", cbPowerOrder1);
      ui.cbPowerOrder1.setChecked(cbPowerOrder1);
    }
    let cbPowerOrder2 = configStorage.get("cbPowerOrder2");
    if (cbPowerOrder2) {
      log("cbPowerOrder2 %s", cbPowerOrder2);
      ui.cbPowerOrder2.setChecked(cbPowerOrder2);
    }
    let cbPowerOrder3 = configStorage.get("cbPowerOrder3");
    if (cbPowerOrder3) {
      log("cbPowerOrder3 %s", cbPowerOrder3);
      ui.cbPowerOrder3.setChecked(cbPowerOrder3);
    }
    let cbPowerOrder4 = configStorage.get("cbPowerOrder4");
    if (cbPowerOrder4) {
      log("cbPowerOrder4 %s", cbPowerOrder4);
      ui.cbPowerOrder4.setChecked(cbPowerOrder4);
    }
    let cbPowerOrder5 = configStorage.get("cbPowerOrder5");
    if (cbPowerOrder5) {
      log("cbPowerOrder5 %s", cbPowerOrder5);
      ui.cbPowerOrder5.setChecked(cbPowerOrder5);
    }
    let conditionTimeRange = configStorage.get("conditionTimeRange");
    if (conditionTimeRange) {
      log("conditionTimeRange %s", conditionTimeRange);
      ui.conditionTimeRange.setChecked(conditionTimeRange);
    }
    let cbTimeRange1 = configStorage.get("cbTimeRange1");
    if (cbTimeRange1) {
      log("cbTimeRange1 %s", cbTimeRange1);
      ui.cbTimeRange1.setChecked(cbTimeRange1);
    }
    let cbTimeRange2 = configStorage.get("cbTimeRange2");
    if (cbTimeRange2) {
      log("cbTimeRange2 %s", cbTimeRange2);
      ui.cbTimeRange2.setChecked(cbTimeRange2);
    }
    let cbTimeRange3 = configStorage.get("cbTimeRange3");
    if (cbTimeRange3) {
      log("cbTimeRange3 %s", cbTimeRange3);
      ui.cbTimeRange3.setChecked(cbTimeRange3);
    }
    let minTime1 = configStorage.get("minTime1");
    if (minTime1) {
      log("minTime1 %s", minTime1);
      ui.minTime1.setText(minTime1 + "");
    }
    let minTime2 = configStorage.get("minTime2");
    if (minTime2) {
      log("minTime2 %s", minTime2);
      ui.minTime2.setText(minTime2 + "");
    }
    let minTime3 = configStorage.get("minTime3");
    if (minTime3) {
      log("minTime3 %s", minTime3);
      ui.minTime3.setText(minTime3 + "");
    }
    let maxTime1 = configStorage.get("maxTime1");
    if (maxTime1) {
      log("maxTime1 %s", maxTime1);
      ui.maxTime1.setText(maxTime1 + "");
    }
    let maxTime2 = configStorage.get("maxTime2");
    if (maxTime2) {
      log("maxTime2 %s", maxTime2);
      ui.maxTime2.setText(maxTime2 + "");
    }
    let maxTime3 = configStorage.get("maxTime3");
    if (maxTime3) {
      log("maxTime3 %s", maxTime3);
      ui.maxTime3.setText(maxTime3 + "");
    }
  },
  refresh: function () {
    let configStorage = this.getStorage();

    // 文本内容设置

    // 数值内容设置

    let maxKm1 = ui.maxKm1.getText();
    if (maxKm1 && maxKm1 != "") {
      configStorage.put("maxKm1", parseInt(maxKm1));
      CF.maxKm1 = parseInt(maxKm1);
    }
    let maxKm2 = ui.maxKm2.getText();
    if (maxKm2 && maxKm2 != "") {
      configStorage.put("maxKm2", parseInt(maxKm2));
      CF.maxKm2 = parseInt(maxKm2);
    }
    let maxKm3 = ui.maxKm3.getText();
    if (maxKm3 && maxKm3 != "") {
      configStorage.put("maxKm3", parseInt(maxKm3));
      CF.maxKm3 = parseInt(maxKm3);
    }
    let maxKm4 = ui.maxKm4.getText();
    if (maxKm4 && maxKm4 != "") {
      configStorage.put("maxKm4", parseInt(maxKm4));
      CF.maxKm4 = parseInt(maxKm4);
    }
    let maxKm5 = ui.maxKm5.getText();
    if (maxKm5 && maxKm5 != "") {
      configStorage.put("maxKm5", parseInt(maxKm5));
      CF.maxKm5 = parseInt(maxKm5);
    }
    let minPrice1 = ui.minPrice1.getText();
    if (minPrice1 && minPrice1 != "") {
      configStorage.put("minPrice1", parseInt(minPrice1));
      CF.minPrice1 = parseInt(minPrice1);
    }
    let minPrice2 = ui.minPrice2.getText();
    if (minPrice2 && minPrice2 != "") {
      configStorage.put("minPrice2", parseInt(minPrice2));
      CF.minPrice2 = parseInt(minPrice2);
    }
    let minPrice3 = ui.minPrice3.getText();
    if (minPrice3 && minPrice3 != "") {
      configStorage.put("minPrice3", parseInt(minPrice3));
      CF.minPrice3 = parseInt(minPrice3);
    }
    let minPrice4 = ui.minPrice4.getText();
    if (minPrice4 && minPrice4 != "") {
      configStorage.put("minPrice4", parseInt(minPrice4));
      CF.minPrice4 = parseInt(minPrice4);
    }
    let minPrice5 = ui.minPrice5.getText();
    if (minPrice5 && minPrice5 != "") {
      configStorage.put("minPrice5", parseInt(minPrice5));
      CF.minPrice5 = parseInt(minPrice5);
    }
    let minTime1 = ui.minTime1.getText();
    if (minTime1 && minTime1 != "") {
      configStorage.put("minTime1", parseInt(minTime1));
      CF.minTime1 = parseInt(minTime1);
    }
    let minTime2 = ui.minTime2.getText();
    if (minTime2 && minTime2 != "") {
      configStorage.put("minTime2", parseInt(minTime2));
      CF.minTime2 = parseInt(minTime2);
    }
    let minTime3 = ui.minTime3.getText();
    if (minTime3 && minTime3 != "") {
      configStorage.put("minTime3", parseInt(minTime3));
      CF.minTime3 = parseInt(minTime3);
    }
    let maxTime1 = ui.maxTime1.getText();
    if (maxTime1 && maxTime1 != "") {
      configStorage.put("maxTime1", parseInt(maxTime1));
      CF.maxTime1 = parseInt(maxTime1);
    }
    let maxTime2 = ui.maxTime2.getText();
    if (maxTime2 && maxTime2 != "") {
      configStorage.put("maxTime2", parseInt(maxTime2));
      CF.maxTime2 = parseInt(maxTime2);
    }
    let maxTime3 = ui.maxTime3.getText();
    if (maxTime3 && maxTime3 != "") {
      configStorage.put("maxTime3", parseInt(maxTime3));
      CF.maxTime3 = parseInt(maxTime3);
    }

    // 开关条件设置
    let conditionPowerOrder = ui.conditionPowerOrder.isChecked();
    configStorage.put("conditionPowerOrder", conditionPowerOrder);
    CF.conditionPowerOrder = conditionPowerOrder;

    let cbPowerOrder1 = ui.cbPowerOrder1.isChecked();
    configStorage.put("cbPowerOrder1", cbPowerOrder1);
    CF.cbPowerOrder1 = cbPowerOrder1;

    let cbPowerOrder2 = ui.cbPowerOrder2.isChecked();
    configStorage.put("cbPowerOrder2", cbPowerOrder2);
    CF.cbPowerOrder2 = cbPowerOrder2;

    let cbPowerOrder3 = ui.cbPowerOrder3.isChecked();
    configStorage.put("cbPowerOrder3", cbPowerOrder3);
    CF.cbPowerOrder3 = cbPowerOrder3;

    let cbPowerOrder4 = ui.cbPowerOrder4.isChecked();
    configStorage.put("cbPowerOrder4", cbPowerOrder4);
    CF.cbPowerOrder4 = cbPowerOrder4;

    let cbPowerOrder5 = ui.cbPowerOrder5.isChecked();
    configStorage.put("cbPowerOrder5", cbPowerOrder5);
    CF.cbPowerOrder5 = cbPowerOrder5;

    let conditionTimeRange = ui.conditionTimeRange.isChecked();
    configStorage.put("conditionTimeRange", conditionTimeRange);
    CF.conditionTimeRange = conditionTimeRange;

    let cbTimeRange1 = ui.cbTimeRange1.isChecked();
    configStorage.put("cbTimeRange1", cbTimeRange1);
    CF.cbTimeRange1 = cbTimeRange1;

    let cbTimeRange2 = ui.cbTimeRange2.isChecked();
    configStorage.put("cbTimeRange2", cbTimeRange2);
    CF.cbTimeRange2 = cbTimeRange2;

    let cbTimeRange3 = ui.cbTimeRange3.isChecked();
    configStorage.put("cbTimeRange3", cbTimeRange3);
    CF.cbTimeRange3 = cbTimeRange3;

    return true;
  },
};

CF.loadForm();
// log(CF)

const AutojsXPro = {
  xx: function (selector) {
    let ele = selector.findOne(5000);
    if (ele) {
      return ele.getText();
    } else {
      return null;
    }
  },
  clickEle: function (ele) {
    // log(ele)
    if (ele) {
      if (ele.clickable()) {
        // log("点元素" + ele);
        return ele.click();
      } else {
        return this.press(ele, 5, 5);
      }
    }
    return false;
  },
  press: (ele, x, y) => {
    var b = ele.bounds();
    // log(b);

    if (!arguments[1]) {
      x = 0;
    }
    if (!arguments[2]) {
      y = 0;
    }

    var halfW = parseInt((b.right - b.left) / 2);
    var halfH = parseInt((b.bottom - b.top) / 2);
    var randomwX = random(-x, x);
    var randomwY = random(-y, y);

    if (Math.abs(randomwX) > halfW) {
      randomwX = 0;
    }
    if (Math.abs(randomwY) > halfW) {
      randomwY = 0;
    }
    var x = b.left + halfW + randomwX;
    var y = b.top + halfH + randomwY;
    log("居中偏移 点击 (%d,%d)", x, y);
    press(x, y, 1);
  },
};

const condition = {
  // 两个都匹配才行
  _matchOk: function (arr, text) {
    for (let a of arr) {
      if (a == null || a == "") {
        continue;
      }
      if (text.indexOf(a) > -1) {
        return true;
      }
    }
  },
  // 任何一条匹配就行
  powerOrderOk: function (order) {
    if (CF.conditionPowerOrder == false) {
      // 没有开启，跳过
      return true;
    }

    // 所有都没有选。认为匹配
    if (
      CF.cbPowerOrder1 == false &&
      CF.cbPowerOrder2 == false &&
      CF.cbPowerOrder3 == false &&
      CF.cbPowerOrder4 == false &&
      CF.cbPowerOrder5 == false
    ) {
      return true;
    }

    if (CF.cbPowerOrder1) {
      if (order.dis <= CF.maxKm1 && order.price >= CF.minPrice1) {
        return true;
      }
    }
    if (CF.cbPowerOrder2) {
      if (order.dis <= CF.maxKm2 && order.price >= CF.minPrice2) {
        return true;
      }
    }
    if (CF.cbPowerOrder3) {
      if (order.dis <= CF.maxKm3 && order.price >= CF.minPrice3) {
        return true;
      }
    }
    if (CF.cbPowerOrder4) {
      if (order.dis <= CF.maxKm4 && order.price >= CF.minPrice4) {
        return true;
      }
    }
    if (CF.cbPowerOrder5) {
      if (order.dis <= CF.maxKm5 && order.price >= CF.minPrice5) {
        return true;
      }
    }

    return false;
  },
};

const YL = {
  getData: function () {
    let res = OCR.getPostionByOCR(0, 0, device.width, device.height);
    // log(res);

    let dataPostion = 0;
    let order = {};
    let hasGetTime = false;
    for (let r of res) {
      let rText = r.text;
      if (!hasGetTime) {
        if (
          rText.indexOf("今天") > -1 ||
          rText.indexOf("明天") > -1 ||
          rText.indexOf("后天") > -1
        ) {
          // log("日期 %s", rText);
          order.use_date = rText;
          hasGetTime = true;
        }
        // 日期在第一位的。没有找到，日期，其他的都不用看了。
        continue;
      }

      if (rText && rText.indexOf("收益（元）") > -1) {
        dataPostion = 1;
        continue;
      }

      if (dataPostion == 0) {
        continue;
      }

      //有时候下一个是航班号。
      if (dataPostion == 1 && rText.indexOf("航班号") > -1) {
        log("包含航班号");
        continue;
      }

      if (dataPostion == 1) {
        log("里程 %s km", rText);
        order.dis = rText;
      } else if (dataPostion == 2) {
        //   log("预计用时 %s", rText);
        //   order.kmTime = rText;
      } else if (dataPostion == 3) {
        log("收益 %s 元", rText);
        order.price = rText;
      } else if (rText == "抢单") {
        log("找到抢单按钮");
        order.qiangBounds = r.bounds;
        break;
      }

      dataPostion++;
    }

    if (order.price && order.dis && order.qiangBounds) {
      log(order);
      return order;
    }

    return null;
  },
  findOrder: function () {
    // 确保在那个界面
    while (1) {
      sleep(300);
      // let eles = visibleToUser(true)
      //   .boundsInside(0, 0, device.width - 1, device.height - 1)
      //   .find();
      // if (eles == null) {
      //   // 订单弹出页面，获取不到任何的界面数据
      //   log("可能弹出订单界面");
      //   log("进行截图分析");
      //   let order = this.getData();
      //   if (order) {
      //     return order;
      //   }
      // }

      // test

      let order = this.getData();
      if (order) {
        return order;
      }
    }
  },
  waitForAmazingOrder: function () {
    let oneHour = 1000 * 60 * 60;

    function comDate(d, d2) {
      var year = d.getFullYear(); //2023
      var month = d.getMonth(); //0
      var day = d.getDate(); //31

      var year2 = d2.getFullYear(); //2023
      var month2 = d2.getMonth(); //0
      var day2 = d2.getDate(); //31

      return year == year2 && month == month2 && day == day2;
    }

    slog("开始匹配……");
    let reTryTimes = 5;
    let tryCount = 0;
    let lastPrice = 0;

    let lastOrder = { price: 0, dis: 0 };

    while (1) {
      sleep(300);
      // 阻塞函数
      let order = this.findOrder();
      if (order == null) {
        continue;
      }

      // 只打印一次日志
      if (lastOrder.price == order.price && lastOrder.dis == order.dis) {
      } else {
        slog("--> 新订单");
        slog("--> 价格 " + order.price + " 公里数 " + order.dis);
        log(order);
        lastOrder = order;
      }

      if (!condition.powerOrderOk(order)) {
        // log("没有优选订单")
        continue;
      }

      // 2024-04-16 16:16
      if (CF.conditionTimeRange) {
        // log("对比时间")

        let today = new Date();

        let timeStr = order.use_date;
        let orderDate = null;
        if (timeStr.indexOf("今天") > -1) {
          orderDate = today;
        } else if (timeStr.indexOf("明天") > -1) {
          orderDate = new Date(today.getTime() + 24 * oneHour);
        } else if (timeStr.indexOf("后天") > -1) {
          orderDate = new Date(today.getTime() + 2 * 24 * oneHour);
        }
        // 8月29日21:05  明天21:05 后天21:05 今天21:05
        let orderHour = parseInt(order.use_date.split("天")[1].split(":"));

        let tomorrowDate = new Date(today.getTime() + 24 * oneHour);
        let tomorrow2Date = new Date(today.getTime() + 2 * 24 * oneHour);

        // 任何一个匹配就行
        function timeRangeOk() {
          if (
            CF.cbTimeRange1 == false &&
            CF.cbTimeRange2 == false &&
            CF.cbTimeRange3 == false
          ) {
            log("所有都没有选，认为选全部");
            return true;
          }

          if (CF.cbTimeRange1) {
            // log("对比第一组时间")
            if (!comDate(today, orderDate)) {
              // log("不符合日期")
              // 对比时间。
            } else {
              if (orderHour < CF.minTime1 || orderHour > CF.maxTime1) {
                // log("不符合时间")
              } else {
                // log("匹配到")
                return true;
              }
            }
          }

          if (CF.cbTimeRange2) {
            // log("对比第2组时间")

            if (!comDate(tomorrowDate, orderDate)) {
              // log("日期不符合")
            } else {
              // 对比时间。
              if (orderHour < CF.minTime2 || orderHour > CF.maxTime2) {
                // log("时间不符合")
              } else {
                return true;
              }
            }
          }

          if (CF.cbTimeRange3) {
            if (!comDate(tomorrow2Date, orderDate)) {
            } else {
              // 对比时间。
              if (orderHour < CF.minTime3 || orderHour > CF.maxTime3) {
              } else {
                return true;
              }
            }
          }

          return false;
        }

        if (!timeRangeOk()) {
          continue;
        }
      }

      // 匹配到合适订单
      // 排除，是上一个订单。
      if (lastPrice != order.price) {
        console.warn("### 匹配到订单！%j", order);
        slog("### 匹配到订单！" + order.price);
        lastPrice = order.price;
        tryCount = 0;
      }

      // 允许，相同订单，点击多次。
      if (tryCount >= reTryTimes) {
        continue;
      }

      let result = this.sheetOrder(order.qiangBounds);

      tryCount = tryCount + 1;
      if (result) {
        log("抢单点击[%s/%s]成功", tryCount, reTryTimes);
        slog("点击抢单 " + tryCount + "/" + reTryTimes + " 成功");
      } else {
        log("抢单点击失败");
        slog("点击抢单失败");
      }
    }
  },
  sheetOrder: function (bounds) {
    log("点击 抢单");
    pressBounds(bounds);

    function pressBounds(bounds) {
      let b = bounds;
      // log(ele)
      let halfW = parseInt((b.right - b.left) / 2);
      let halfH = parseInt((b.bottom - b.top) / 2);

      let x = b.left + halfW;
      let y = b.top + halfH;
      log("居中 点击 (%d,%d)", x, y);
      return press(x, y, 1);
    }
    return true;
    // slog("抢单测试" + bounds);
    // return false; //测试需要，先注释掉
  },
};

ui.save.click(function () {
  log("保存参数");
  if (!CF.refresh()) {
    toast("请检查配置,配置错误");
    return;
  }
  log(CF);
  toast("已保存");
});

ui.bt.click(function () {
  //程序开始运行之前判断无障碍服务
  if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    return;
  }

  const hasStart = "任务已启动，请手动切换至抢单对应界面";
  if (ui.bt.getText() == hasStart) {
    toast("任务已经启动");
    log("任务已经启动，不必重复点击");
    return;
  }

  if (!CF.refresh()) {
    toast("请检查配置,配置错误");
    return;
  }
  log(CF);

  // if (ui.consoleShow.isChecked()) {
  //   threads.start(() => {
  //     let dw = device.width;
  //     let dh = device.height;
  //     let cw = (dw * 1) / 3;
  //     let ch = (dh * 5) / 10;

  //     console.setTitle("自动接单");
  //     console.show(true);
  //     console.setCanInput(false);
  //     sleep(100); //等待一会，才能设置尺寸成功
  //     console.setSize(cw, ch); //需要前面等待一会
  //     console.setPosition(dw - (cw + 50), 50);
  //     console.setMaxLines(300);
  //   });
  // }

  threads.start(function () {
    日志窗口();
    home();
    threads.start(悬浮);
    sleep(2000);
    // YL.openTargetLocation()
  });
  device.keepScreenOn(3600 * 1000);
  device.setBrightness(2);
  log("设备会保持常亮");

  ui.bt.setText(hasStart);
  ui.bt.setBackgroundColor(反色(ui.bt.getBackground().getColor()));
  log("任务已经启动");
});

function 反色(color) {
  return (
    -1 -
    colors.argb(0, colors.red(color), colors.green(color), colors.blue(color))
  );
}
ui.autoService.on("check", function (checked) {
  // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
  if (checked && auto.service == null) {
    app.startActivity({
      action: "android.settings.ACCESSIBILITY_SETTINGS",
    });
  }
  if (!checked && auto.service != null) {
    auto.service.disableSelf();
  }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
  // 此时根据无障碍服务的开启情况，同步开关的状态
  ui.autoService.checked = auto.service != null;
});

function 日志窗口() {
  floatyLogInit(3, device.width * 0.3, device.height * 0.6, true); //主显示
  device.wakeUp();
}

function slog(nr) {
  floatyLog(nr);
}

function 悬浮() {
  var window = floaty.window(
    <vertical w="*">
      <linear id="h" gravity="center">
        <button margin="0" w="60" id="action" text="启动" textSize="15sp" />
      </linear>
      <linear id="h1" gravity="center">
        <button margin="0" w="0" id="bt2" text="隐藏" textSize="15sp" />
      </linear>
      <linear id="h2" gravity="center">
        <button margin="0" w="60" id="bt3" text="退出" textSize="15sp" />
      </linear>
    </vertical>
  );
  window.setPosition(0, device.height / 2);
  setInterval(() => {}, 1000);
  var execution = null;
  //记录按键被按下时的触摸坐标
  var x = 0,
    y = 0;
  //记录按键被按下时的悬浮窗位置
  var windowX, windowY;
  //记录按键被按下的时间以便判断长按等动作
  var downTime;
  window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_DOWN:
        x = event.getRawX();
        y = event.getRawY();
        windowX = window.getX();
        windowY = window.getY();
        downTime = new Date().getTime();
        return true;
      case event.ACTION_MOVE:
        //移动手指时调整悬浮窗位置
        window.setPosition(
          windowX + (event.getRawX() - x),
          windowY + (event.getRawY() - y)
        );
        //如果按下的时间超过1.5秒判断为长按，退出脚本
        if (new Date().getTime() - downTime > 30000) {
          exit();
        }
        return true;
      case event.ACTION_UP:
        //手指弹起时如果偏移很小则判断为点击
        if (
          Math.abs(event.getRawY() - y) < 5 &&
          Math.abs(event.getRawX() - x) < 5
        ) {
          onClick();
        }
        return true;
    }
    return true;
  });
  window.bt2.click(() => {
    window.h.visibility = 8;
    window.h1.visibility = 8;
    window.h2.visibility = 8;
  });
  window.bt3.click(() => {
    toast("退出脚本");
    // console.hide();
    engines.stopAll();
  });
  function onClick() {
    if (window.action.getText() == "启动") {
      线 = threads.start(日志窗口);
      线1 = threads.start(function () {
        YL.waitForAmazingOrder();
      });
      window.action.setText("停止");
    } else {
      window.action.setText("启动");
      停止脚本();
    }
  }
}

function 停止脚本() {
  toastLog("正常退出脚本");
  // console.hide();
  threads.shutDownAll();
}

function floatyLogInit(linesCount, x, y, islog) {
  linesCount = linesCount || 6;
  if (typeof linesCount != "number") linesCount = 6;
  if (typeof x != "number") x = 0;
  if (typeof y != "number") y = 10;
  if (typeof islog != "boolean") islog = true;

  ww = floaty.rawWindow(
    <horizontal
      id="move"
      background="#000000"
      paddingLeft="10"
      paddingRight="10"
      w="*"
    >
      <button
        id="log"
        textSize="13dp"
        textColor="#0bf613"
        style="Widget/AppCompat.Button.Borderless"
        text="[运行日志]"
        textStyle="bold"
        layout_gravity="right"
        layout_weight="5"
        layout_width="wrap_content"
        layout_height="wrap_content"
      />
    </horizontal>
  );
  ww.setTouchable(false);
  ui.run(() => {
    ww.setPosition(x, y);
  });

  let nowlogArr = [];
  floatyLog = function () {
    let s = "[" + dateFormat(new Date(), "mm:ss") + "] ";
    for (let param of arguments) s += param + " ";
    nowlogArr.push(s);

    if (nowlogArr.length > linesCount) nowlogArr.shift();
    let printContent = nowlogArr.join("\n");
    ui.run(() => {
      ww.log.text(printContent);
    });
    if (islog) log(s);
  };

  floatyShow = function (x, y) {
    let _x = x || 0;
    let _y = y || 10;
    ui.run(() => {
      ww.setPosition(_x, _y);
    });
  };

  floatyHide = function () {
    ui.run(() => {
      ww.setPosition(3000, 3000);
    });
  };
  function dateFormat(date, fmt) {
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
}
