dmc-operation-parameter-form.Operation__parameterForm
  virtual(if="{ uiType === 'input' }")
    dmc-textinput(text="{ opts.parametervalue }" onChange="{ handleInputChange }")
  virtual(if="{ uiType === 'checkbox' }")
    dmc-checkbox(isChecked="{ opts.parametervalue }" onChange="{ handleCheckboxChange }")
  virtual(if="{ uiType === 'select' }")
    dmc-select(isOpened="{ isOpened }" options="{ getSelectOptions() }" onToggle="{ handleSelectToggle }" onChange="{ handleSelectChange }")

  script.
    import '../../atoms/dmc-checkbox/index.tag';
    import '../../atoms/dmc-select/index.tag';
    import '../../atoms/dmc-textinput/index.tag';
    import script from './parameter-form';
    this.external(script);
