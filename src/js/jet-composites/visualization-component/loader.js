/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./visualization-component-view.html', './visualization-component-viewModel', 'text!./component.json', 'css!./visualization-component-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('visualization-component', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);