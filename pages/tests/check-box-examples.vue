<template>
  <div>
    What would you prefer to have?
    <br>
    <div class="checkbox">
      <input id="check1" type="checkbox" name="check" value="check1">
      <label for="check1">Breakfast</label>
      <br>
      <input id="check2" type="checkbox" name="check" value="check2">
      <label for="check2">Lunch</label>
      <br>
      <input id="check3" type="checkbox" name="check" value="check3">
      <label for="check3">Dinner</label>
    </div>
  </div>
</template>
<style scoped>
label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  margin-right: 15px;
  font-size: 11px;
}

label:before {
  content: "";
  display: inline-block;


  width: 16px;
  height: 16px;


  margin-right: 5px;
  margin-left: 8px;  /*this moves the checkbox closer/ farther from the label*/
  position: absolute;
  left: 0;
  bottom: 1px;
  background-color: pink;
  box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);
}

input[type=checkbox] {
  display: none;
}
.checkbox label:before {
  border-radius: 3px;
}

input[type=checkbox]:checked + label:before {
  content: "\2713";
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
  font-size: 12px;
  color: #fff;
  text-align: center;
    line-height: 12px;
}
</style>