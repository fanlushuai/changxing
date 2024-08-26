"ui";

ui.layout(
  <frame w="*" h="*" bg="#F6FFE3" gravity="center">

    <vertical >
      <ScrollView >
        <vertical marginTop="130">
          <vertical marginLeft="30" marginRight="30" marginTop="40">
            <horizontal gravity="center">
              <vertical marginRight="30">
                <Switch
                  id="autoService"
                  text="无障碍服务"
                  textStyle="bold"
                  textColor="#000000"
                  textSize="16sp"
                  checked="{{auto.service!=null}}"
                />

              </vertical>
              <vertical>
                <Switch
                  id="consoleShow"
                  text="控制台悬浮窗"
                  textStyle="bold"
                  textColor="#000000"
                  textSize="16sp"
                  checked="true"
                />

              </vertical>

            </horizontal>
            <vertical marginTop="14" >
              <Switch
                id="conditionPriceRange"
                text="单价范围"
                textStyle="bold"
                textColor="#000000"
                textSize="16sp"
                checked="false"
              />
              <horizontal marginTop="0" gravity="center">
                <text text="[" />
                <input
                  text="0"
                  lines="1"
                  maxLength="6"
                  id="minPriceForm"
                  inputType="number"
                  w="80"
                  gravitry="center"
                />
                <text text="," />
                <input
                  text="1000"
                  lines="1"
                  maxLength="6"
                  inputType="number"
                  id="maxPriceForm"
                  w="80"
                  gravitry="center"
                />
                <text text="]" />
                <text text="元" />
              </horizontal>

              <Switch
                id="conditionStation"
                marginTop="20"
                text="开启优选站点"
                textStyle="bold"
                textColor="#000000"
                textSize="16sp"
                checked="false"
              />
              <text textColor="red" text="关键词之间用 逗号，分割" />

              <horizontal marginTop="14" gravity="left">
                <text text="上车点：" />
                <input
                  text=""
                  inputType="textImeMultiLine"
                  id="fromStation"
                  w="*"
                  gravitry="center"
                />
              </horizontal>
              <horizontal marginTop="14" gravity="left">
                <text text="下车点：" />
                <input
                  text=""
                  inputType="textImeMultiLine"
                  id="toStation"
                  w="*"
                />
              </horizontal>

              <Switch
                id="conditionPowerOrder"
                marginTop="20"
                text="开启优选订单"
                textStyle="bold"
                textColor="#000000"
                textSize="16sp"
                checked="false"
              />

              <text textColor="red" text="任意条件匹配即可" />

              <horizontal marginTop="0" gravity="center"> <checkbox id="cbPowerOrder1"></checkbox> <text text="全程≤ [" /> <input lines="1" maxLength="6" inputType="number" id="maxKm1" w="60" gravitry="center" /> <text text="] 公里，金额 ≥ " /> <input lines="1" maxLength="6" inputType="number" id="minPrice1" w="80" gravitry="center" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbPowerOrder2"></checkbox> <text text="全程≤ [" /> <input lines="1" maxLength="6" inputType="number" id="maxKm2" w="60" gravitry="center" /> <text text="] 公里，金额 ≥ " /> <input lines="1" maxLength="6" inputType="number" id="minPrice2" w="80" gravitry="center" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbPowerOrder3"></checkbox> <text text="全程≤ [" /> <input lines="1" maxLength="6" inputType="number" id="maxKm3" w="60" gravitry="center" /> <text text="] 公里，金额 ≥ " /> <input lines="1" maxLength="6" inputType="number" id="minPrice3" w="80" gravitry="center" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbPowerOrder4"></checkbox> <text text="全程≤ [" /> <input lines="1" maxLength="6" inputType="number" id="maxKm4" w="60" gravitry="center" /> <text text="] 公里，金额 ≥ " /> <input lines="1" maxLength="6" inputType="number" id="minPrice4" w="80" gravitry="center" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbPowerOrder5"></checkbox> <text text="全程≤ [" /> <input lines="1" maxLength="6" inputType="number" id="maxKm5" w="60" gravitry="center" /> <text text="] 公里，金额 ≥ " /> <input lines="1" maxLength="6" inputType="number" id="minPrice5" w="80" gravitry="center" /> </horizontal>

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

              <horizontal marginTop="14" gravity="center"> <checkbox id="cbTimeRange1"></checkbox> <text text="今天 [" /> <input text="0" lines="1" maxLength="6" inputType="number" id="minTime1" w="40" gravitry="center" /> <text text="," /> <input text="24" lines="1" maxLength="6" inputType="number" id="maxTime1" w="40" gravitry="center" /> <text text="] (24小时)" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbTimeRange2"></checkbox> <text text="明天 [" /> <input text="0" lines="1" maxLength="6" inputType="number" id="minTime2" w="40" gravitry="center" /> <text text="," /> <input text="24" lines="1" maxLength="6" inputType="number" id="maxTime2" w="40" gravitry="center" /> <text text="] (24小时)" /> </horizontal>
              <horizontal marginTop="0" gravity="center"> <checkbox id="cbTimeRange3"></checkbox> <text text="后天 [" /> <input text="0" lines="1" maxLength="6" inputType="number" id="minTime3" w="40" gravitry="center" /> <text text="," /> <input text="24" lines="1" maxLength="6" inputType="number" id="maxTime3" w="40" gravitry="center" /> <text text="] (24小时)" /> </horizontal>

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
              <text> 2. 填入金额范围。</text>
              <text> 3. 点击启动。</text>
              <text> 4. 手动切换到目标app对应界面。等待自动抢单。</text>
              <text>注意：开启悬浮窗，可以避免被系统杀掉。</text>
            </vertical>
          </vertical>
        </vertical>

      </ScrollView>
    </vertical>
  </frame>
);

const CF = {
  conditionPriceRange: false,
  minPriceForm: 0,
  maxPriceForm: 100000,

  conditionStation: false,
  fromStation: "",
  toStation: "",

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
    return storages.create("changxingV2");
  },
  // todo 
  loadFormV2: function () {
    let configStorage = this.getStorage();

    // todo 获取页面内的所有id,input text, input number,checkedbox,switch,。动态的，从页面里面，生成。参数的加载，和保存。

    let checkedIds = ['conditionPriceRange', 'conditionStation', 'conditionPowerOrder', 'conditionTimeRange']

    const regex = /id/ig
    for (let id of checkedIds) {
      let codeTemplate = 'let cf = configStorage.get("id") if (cf) { ui.id.setChecked(cf) }'
      log("xxx")
      let oneParm = codeTemplate.replace(regex, id)
      log(oneParm)
      eval(oneParm)
    }
  },
  loadForm: function () {
    // 将本地存储内容，加载到表单上面
    let configStorage = this.getStorage();
    let conditionPriceRange = configStorage.get("conditionPriceRange")
    if (conditionPriceRange) {
      log("conditionPriceRange %s", conditionPriceRange)
      ui.conditionPriceRange.setChecked(conditionPriceRange)
    }
    let minPriceForm = configStorage.get("minPriceForm")
    if (minPriceForm) {
      log("minPriceForm %s", minPriceForm)
      ui.minPriceForm.setText(minPriceForm + "")
    }
    let maxPriceForm = configStorage.get("maxPriceForm")
    if (maxPriceForm) {
      log("maxPriceForm %s", maxPriceForm)
      ui.maxPriceForm.setText(maxPriceForm + "")
    }
    let conditionStation = configStorage.get("conditionStation")
    if (conditionStation) {
      log("conditionStation %s", conditionStation)
      ui.conditionStation.setChecked(conditionStation)
    }
    let fromStation = configStorage.get("fromStation")
    if (fromStation) {
      log("fromStation %s", fromStation)
      ui.fromStation.setText(fromStation + "")
    }
    let toStation = configStorage.get("toStation")
    if (toStation) {
      log("toStation %s", toStation)
      ui.toStation.setText(toStation + "")
    }
    let conditionPowerOrder = configStorage.get("conditionPowerOrder")
    if (conditionPowerOrder) {
      log("conditionPowerOrder %s", conditionPowerOrder)
      ui.conditionPowerOrder.setChecked(conditionPowerOrder)
    }
    let maxKm1 = configStorage.get("maxKm1")
    if (maxKm1) {
      log("maxKm1 %s", maxKm1)
      ui.maxKm1.setText(maxKm1 + "")
    }
    let maxKm2 = configStorage.get("maxKm2")
    if (maxKm2 && maxKm2 != "") {
      log("maxKm2 %s", maxKm2)
      ui.maxKm2.setText(maxKm2 + "")
    }
    let maxKm3 = configStorage.get("maxKm3")
    if (maxKm3) {
      log("maxKm3 %s", maxKm3)
      ui.maxKm3.setText(maxKm3 + "")
    }
    let maxKm4 = configStorage.get("maxKm4")
    if (maxKm4) {
      log("maxKm4 %s", maxKm4)
      ui.maxKm4.setText(maxKm4 + "")
    }
    let maxKm5 = configStorage.get("maxKm5")
    if (maxKm5) {
      log("maxKm5 %s", maxKm5)
      ui.maxKm5.setText(maxKm5 + "")
    }
    let minPrice1 = configStorage.get("minPrice1")
    if (minPrice1) {
      log("minPrice1 %s", minPrice1)
      ui.minPrice1.setText(minPrice1 + "")
    }
    let minPrice2 = configStorage.get("minPrice2")
    if (minPrice2) {
      log("minPrice2 %s", minPrice2)
      ui.minPrice2.setText(minPrice2 + "")
    }
    let minPrice3 = configStorage.get("minPrice3")
    if (minPrice3) {
      log("minPrice3 %s", minPrice3)
      ui.minPrice3.setText(minPrice3 + "")
    }
    let minPrice4 = configStorage.get("minPrice4")
    if (minPrice4) {
      log("minPrice4 %s", minPrice4)
      ui.minPrice4.setText(minPrice4 + "")
    }
    let minPrice5 = configStorage.get("minPrice5")
    if (minPrice5) {
      log("minPrice5 %s", minPrice5)
      ui.minPrice5.setText(minPrice5 + "")
    }
    let cbPowerOrder1 = configStorage.get("cbPowerOrder1")
    if (cbPowerOrder1) {
      log("cbPowerOrder1 %s", cbPowerOrder1)
      ui.cbPowerOrder1.setChecked(cbPowerOrder1)
    }
    let cbPowerOrder2 = configStorage.get("cbPowerOrder2")
    if (cbPowerOrder2) {
      log("cbPowerOrder2 %s", cbPowerOrder2)
      ui.cbPowerOrder2.setChecked(cbPowerOrder2)
    }
    let cbPowerOrder3 = configStorage.get("cbPowerOrder3")
    if (cbPowerOrder3) {
      log("cbPowerOrder3 %s", cbPowerOrder3)
      ui.cbPowerOrder3.setChecked(cbPowerOrder3)
    }
    let cbPowerOrder4 = configStorage.get("cbPowerOrder4")
    if (cbPowerOrder4) {
      log("cbPowerOrder4 %s", cbPowerOrder4)
      ui.cbPowerOrder4.setChecked(cbPowerOrder4)
    }
    let cbPowerOrder5 = configStorage.get("cbPowerOrder5")
    if (cbPowerOrder5) {
      log("cbPowerOrder5 %s", cbPowerOrder5)
      ui.cbPowerOrder5.setChecked(cbPowerOrder5)
    }
    let conditionTimeRange = configStorage.get("conditionTimeRange")
    if (conditionTimeRange) {
      log("conditionTimeRange %s", conditionTimeRange)
      ui.conditionTimeRange.setChecked(conditionTimeRange)
    }
    let cbTimeRange1 = configStorage.get("cbTimeRange1")
    if (cbTimeRange1) {
      log("cbTimeRange1 %s", cbTimeRange1)
      ui.cbTimeRange1.setChecked(cbTimeRange1)
    }
    let cbTimeRange2 = configStorage.get("cbTimeRange2")
    if (cbTimeRange2) {
      log("cbTimeRange2 %s", cbTimeRange2)
      ui.cbTimeRange2.setChecked(cbTimeRange2)
    }
    let cbTimeRange3 = configStorage.get("cbTimeRange3")
    if (cbTimeRange3) {
      log("cbTimeRange3 %s", cbTimeRange3)
      ui.cbTimeRange3.setChecked(cbTimeRange3)
    }
    let minTime1 = configStorage.get("minTime1")
    if (minTime1) {
      log("minTime1 %s", minTime1)
      ui.minTime1.setText(minTime1 + "")
    }
    let minTime2 = configStorage.get("minTime2")
    if (minTime2) {
      log("minTime2 %s", minTime2)
      ui.minTime2.setText(minTime2 + "")
    }
    let minTime3 = configStorage.get("minTime3")
    if (minTime3) {
      log("minTime3 %s", minTime3)
      ui.minTime3.setText(minTime3 + "")
    }
    let maxTime1 = configStorage.get("maxTime1")
    if (maxTime1) {
      log("maxTime1 %s", maxTime1)
      ui.maxTime1.setText(maxTime1 + "")
    }
    let maxTime2 = configStorage.get("maxTime2")
    if (maxTime2) {
      log("maxTime2 %s", maxTime2)
      ui.maxTime2.setText(maxTime2 + "")
    }
    let maxTime3 = configStorage.get("maxTime3")
    if (maxTime3) {
      log("maxTime3 %s", maxTime3)
      ui.maxTime3.setText(maxTime3 + "")
    }
  },
  refresh: function () {
    let configStorage = this.getStorage();

    // 文本内容设置

    // 数值内容设置
    let minPriceForm = ui.minPriceForm.getText()
    if (minPriceForm && minPriceForm != "") {
      configStorage.put("minPriceForm", parseInt(minPriceForm))
      CF.minPriceForm = parseInt(minPriceForm)
    }
    let maxPriceForm = ui.maxPriceForm.getText()
    if (maxPriceForm && maxPriceForm != "") {
      configStorage.put("maxPriceForm", parseInt(maxPriceForm))
      CF.maxPriceForm = parseInt(maxPriceForm)
    }
    let fromStation = ui.fromStation.getText()
    if (fromStation) {
      configStorage.put("fromStation", fromStation + "")
      CF.fromStation = fromStation + ""
    }
    let toStation = ui.toStation.getText()
    if (toStation) {
      configStorage.put("toStation", toStation + "")
      CF.toStation = toStation + ""
    }
    let maxKm1 = ui.maxKm1.getText()
    if (maxKm1 && maxKm1 != "") {
      configStorage.put("maxKm1", parseInt(maxKm1))
      CF.maxKm1 = parseInt(maxKm1)
    }
    let maxKm2 = ui.maxKm2.getText()
    if (maxKm2 && maxKm2 != "") {
      configStorage.put("maxKm2", parseInt(maxKm2))
      CF.maxKm2 = parseInt(maxKm2)
    }
    let maxKm3 = ui.maxKm3.getText()
    if (maxKm3 && maxKm3 != "") {
      configStorage.put("maxKm3", parseInt(maxKm3))
      CF.maxKm3 = parseInt(maxKm3)
    }
    let maxKm4 = ui.maxKm4.getText()
    if (maxKm4 && maxKm4 != "") {
      configStorage.put("maxKm4", parseInt(maxKm4))
      CF.maxKm4 = parseInt(maxKm4)
    }
    let maxKm5 = ui.maxKm5.getText()
    if (maxKm5 && maxKm5 != "") {
      configStorage.put("maxKm5", parseInt(maxKm5))
      CF.maxKm5 = parseInt(maxKm5)
    }
    let minPrice1 = ui.minPrice1.getText()
    if (minPrice1 && minPrice1 != "") {
      configStorage.put("minPrice1", parseInt(minPrice1))
      CF.minPrice1 = parseInt(minPrice1)
    }
    let minPrice2 = ui.minPrice2.getText()
    if (minPrice2 && minPrice2 != "") {
      configStorage.put("minPrice2", parseInt(minPrice2))
      CF.minPrice2 = parseInt(minPrice2)
    }
    let minPrice3 = ui.minPrice3.getText()
    if (minPrice3 && minPrice3 != "") {
      configStorage.put("minPrice3", parseInt(minPrice3))
      CF.minPrice3 = parseInt(minPrice3)
    }
    let minPrice4 = ui.minPrice4.getText()
    if (minPrice4 && minPrice4 != "") {
      configStorage.put("minPrice4", parseInt(minPrice4))
      CF.minPrice4 = parseInt(minPrice4)
    }
    let minPrice5 = ui.minPrice5.getText()
    if (minPrice5 && minPrice5 != "") {
      configStorage.put("minPrice5", parseInt(minPrice5))
      CF.minPrice5 = parseInt(minPrice5)
    }
    let minTime1 = ui.minTime1.getText()
    if (minTime1 && minTime1 != "") {
      configStorage.put("minTime1", parseInt(minTime1))
      CF.minTime1 = parseInt(minTime1)
    }
    let minTime2 = ui.minTime2.getText()
    if (minTime2 && minTime2 != "") {
      configStorage.put("minTime2", parseInt(minTime2))
      CF.minTime2 = parseInt(minTime2)
    }
    let minTime3 = ui.minTime3.getText()
    if (minTime3 && minTime3 != "") {
      configStorage.put("minTime3", parseInt(minTime3))
      CF.minTime3 = parseInt(minTime3)
    }
    let maxTime1 = ui.maxTime1.getText()
    if (maxTime1 && maxTime1 != "") {
      configStorage.put("maxTime1", parseInt(maxTime1))
      CF.maxTime1 = parseInt(maxTime1)
    }
    let maxTime2 = ui.maxTime2.getText()
    if (maxTime2 && maxTime2 != "") {
      configStorage.put("maxTime2", parseInt(maxTime2))
      CF.maxTime2 = parseInt(maxTime2)
    }
    let maxTime3 = ui.maxTime3.getText()
    if (maxTime3 && maxTime3 != "") {
      configStorage.put("maxTime3", parseInt(maxTime3))
      CF.maxTime3 = parseInt(maxTime3)
    }


    // 开关条件设置
    let conditionPriceRange = ui.conditionPriceRange.isChecked()
    configStorage.put("conditionPriceRange", conditionPriceRange)
    CF.conditionPriceRange = conditionPriceRange

    let conditionStation = ui.conditionStation.isChecked()
    configStorage.put("conditionStation", conditionStation)
    CF.conditionStation = conditionStation

    let conditionPowerOrder = ui.conditionPowerOrder.isChecked()
    configStorage.put("conditionPowerOrder", conditionPowerOrder)
    CF.conditionPowerOrder = conditionPowerOrder

    let cbPowerOrder1 = ui.cbPowerOrder1.isChecked()
    configStorage.put("cbPowerOrder1", cbPowerOrder1)
    CF.cbPowerOrder1 = cbPowerOrder1

    let cbPowerOrder2 = ui.cbPowerOrder2.isChecked()
    configStorage.put("cbPowerOrder2", cbPowerOrder2)
    CF.cbPowerOrder2 = cbPowerOrder2

    let cbPowerOrder3 = ui.cbPowerOrder3.isChecked()
    configStorage.put("cbPowerOrder3", cbPowerOrder3)
    CF.cbPowerOrder3 = cbPowerOrder3

    let cbPowerOrder4 = ui.cbPowerOrder4.isChecked()
    configStorage.put("cbPowerOrder4", cbPowerOrder4)
    CF.cbPowerOrder4 = cbPowerOrder4

    let cbPowerOrder5 = ui.cbPowerOrder5.isChecked()
    configStorage.put("cbPowerOrder5", cbPowerOrder5)
    CF.cbPowerOrder5 = cbPowerOrder5

    let conditionTimeRange = ui.conditionTimeRange.isChecked()
    configStorage.put("conditionTimeRange", conditionTimeRange)
    CF.conditionTimeRange = conditionTimeRange

    let cbTimeRange1 = ui.cbTimeRange1.isChecked()
    configStorage.put("cbTimeRange1", cbTimeRange1)
    CF.cbTimeRange1 = cbTimeRange1

    let cbTimeRange2 = ui.cbTimeRange2.isChecked()
    configStorage.put("cbTimeRange2", cbTimeRange2)
    CF.cbTimeRange2 = cbTimeRange2

    let cbTimeRange3 = ui.cbTimeRange3.isChecked()
    configStorage.put("cbTimeRange3", cbTimeRange3)
    CF.cbTimeRange3 = cbTimeRange3

    return true;
  },
};

CF.loadForm();
// log(CF)

const AutojsXPro = {
  xx: function (selector) {
    let ele = selector.findOne(5000)
    if (ele) {
      return ele.getText()
    } else {
      return null
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
  priceRangeOk: function (order) {
    if (CF.conditionPriceRange == false) {
      return true
    }


    if (CF.minPriceForm) {
      if (order.price < CF.minPriceForm) {
        return false
      }
    }

    if (CF.maxPriceForm) {
      if (order.price > CF.maxPriceForm) {
        return false
      }
    }

    return true
  },
  _matchOk: function (arr, text) {
    for (let a of arr) {
      if (a == null || a == "") {
        continue
      }
      if (text.indexOf(a) > -1) {
        return true
      }
    }
  },
  // 两个都匹配才行
  stationOk: function (order) {
    if (CF.conditionStation == false) {
      // 没有开启，跳过
      return true
    }


    let regex = /，/ig
    if (CF.fromStation != null && CF.fromStation != "" && CF.fromStation != NaN) {
      let fromKeys = CF.fromStation.trim().replace(regex, ",").split(",")
      if (!this._matchOk(fromKeys, order.from)) {
        return false
      }
    }

    if (CF.toStation != null && CF.toStation != "" && CF.toStation != NaN) {
      let toKeys = CF.toStation.trim().replace(regex, ",").split(",")
      if (!this._matchOk(toKeys, order.to)) {
        return false
      }
    }

    // 都没有选，认为匹配。
    return true
  },
  // 任何一条匹配就行
  powerOrderOk: function (order) {

    if (CF.conditionPowerOrder == false) {
      // 没有开启，跳过
      return true
    }

    // 所有都没有选。认为匹配
    if (
      CF.cbPowerOrder1 == false &&
      CF.cbPowerOrder2 == false &&
      CF.cbPowerOrder3 == false &&
      CF.cbPowerOrder4 == false &&
      CF.cbPowerOrder5 == false
    ) {
      return true
    }

    if (CF.cbPowerOrder1) {
      if (order.dis <= CF.maxKm1 && order.price >= CF.minPrice1) {
        return true
      }
    }
    if (CF.cbPowerOrder2) {
      if (order.dis <= CF.maxKm2 && order.price >= CF.minPrice2) {
        return true
      }
    }
    if (CF.cbPowerOrder3) {
      if (order.dis <= CF.maxKm3 && order.price >= CF.minPrice3) {
        return true
      }
    }
    if (CF.cbPowerOrder4) {
      if (order.dis <= CF.maxKm4 && order.price >= CF.minPrice4) {
        return true
      }
    }
    if (CF.cbPowerOrder5) {
      if (order.dis <= CF.maxKm5 && order.price >= CF.minPrice5) {
        return true
      }
    }

    return false

  }

}

const ChangXing = {

  findOrder: function () {

    // 确保在那个界面
    let inOrderUI = AutojsXPro.xx(text("用车时间仅限参考，请自行关注航班动态"))
    if (!inOrderUI) {
      // log("当前不在订单弹出框页面")
      return null
    }

    // 拿到订单的所有数据
    let order = {}

    // text("2024-04-16 16:16")
    order.use_date = AutojsXPro.xx(id("cn.vippw.changxing:id/use_date"))
    if (!order.use_date) {
      return null
    }

    // text("43分钟(36公里)")
    // text("2小时43分钟(232公里)")
    order.dis = AutojsXPro.xx(id("cn.vippw.changxing:id/dis"))
    // 如果为null。快速返回。因为，后面很多阻塞操作。没意义了。
    if (!order.dis) {
      return null
    }

    order.dis = parseInt(order.dis.replace("公里)", "").split("(")[1])

    order.price = AutojsXPro.xx(id("cn.vippw.changxing:id/price"))
    if (!order.price) {
      return null
    }



    order.from = AutojsXPro.xx(id("cn.vippw.changxing:id/from"))
    if (!order.from) {
      return null
    }
    order.to = AutojsXPro.xx(id("cn.vippw.changxing:id/to"))
    if (!order.to) {
      return null
    }


    return order
  },
  waitForAmazingOrder: function () {

    let oneHour = 1000 * 60 * 60

    function comDate(d, d2) {
      var year = d.getFullYear();//2023
      var month = d.getMonth();//0 
      var day = d.getDate();//31

      var year2 = d2.getFullYear();//2023
      var month2 = d2.getMonth();//0 
      var day2 = d2.getDate();//31

      return year == year2 && month == month2 && day == day2
    }

    log("开始匹配……")
    let reTryTimes = 5;
    let tryCount = 0;
    let lastPrice = 0;

    let lastOrder = { price: 0, dis: 0 }

    while (1) {
      sleep(300)
      // 阻塞函数
      let order = this.findOrder();
      if (order == null) {
        continue
      }

      // 只打印一次日志
      if (lastOrder.price == order.price && lastOrder.dis == order.dis) {
      } else {
        log("--> 新订单")
        log(order)
        lastOrder = order
      }

      if (!condition.priceRangeOk(order)) {
        continue
      }

      if (!condition.stationOk(order)) {
        continue
      }

      if (!condition.powerOrderOk(order)) {
        // log("没有优选订单")
        continue
      }

      // 2024-04-16 16:16
      if (CF.conditionTimeRange) {
        // log("对比时间")
        let targetDateArr = order.use_date.split(" ")
        let orderDate = new Date(targetDateArr[0])
        let orderHour = parseInt(targetDateArr[1].split(":")[0])
        // log("orderHour %s", orderHour)

        let today = new Date()
        let tomorrowDate = new Date(today.getTime() + 24 * oneHour)
        let tomorrow2Date = new Date(today.getTime() + 2 * 24 * oneHour)

        // 任何一个匹配就行
        function timeRangeOk() {
          if (
            CF.cbTimeRange1 == false &&
            CF.cbTimeRange2 == false &&
            CF.cbTimeRange3 == false
          ) {
            log("所有都没有选，认为选全部")
            return true
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
                return true
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
                return true
              }
            }
          }

          if (CF.cbTimeRange3) {
            if (!comDate(tomorrow2Date, orderDate)) {
            } else {
              // 对比时间。
              if (orderHour < CF.minTime3 || orderHour > CF.maxTime3) {
              } else {
                return true
              }
            }
          }

          return false
        }

        if (!timeRangeOk()) {
          continue
        }

      }

      // 匹配到合适订单
      // 排除，是上一个订单。
      if (lastPrice != order.price) {
        console.warn("### 匹配到订单！%j", order);
        lastPrice = order.price;
        tryCount = 0;
      }

      // 允许，相同订单，点击多次。
      if (tryCount >= reTryTimes) {
        continue;
      }

      let result = this.sheetOrder();

      tryCount = tryCount + 1;
      if (result) {
        log("抢单点击[%s/%s]成功", tryCount, reTryTimes);
      } else {
        log("抢单点击失败");
      }
    }
  }
  ,
  sheetOrder: function () {
    log("执行抢单");

    // log("抢单测试")
    // return false; //测试需要，先注释掉

    let ele = id("sub").text("抢单").findOne(3000);
    return AutojsXPro.clickEle(ele);
  },
};

ui.save.click(function () {
  log("保存参数")
  if (!CF.refresh()) {
    toast("请检查配置,配置错误");
    return;
  }
  log(CF)
  toast("已保存")
})

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
  log(CF)

  if (ui.consoleShow.isChecked()) {
    threads.start(() => {
      let dw = device.width;
      let dh = device.height;
      let cw = (dw * 1) / 3;
      let ch = (dh * 5) / 10;

      console.setTitle("自动接单");
      console.show(true);
      console.setCanInput(false);
      sleep(100); //等待一会，才能设置尺寸成功
      console.setSize(cw, ch); //需要前面等待一会
      console.setPosition(dw - (cw + 50), 50);
      console.setMaxLines(300);
    });
  }

  threads.start(function () {
    ChangXing.waitForAmazingOrder();
    // ChangXing.openTargetLocation()
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


let order = { dis: 71, price: 132 }
log(condition.powerOrderOk(order))