const config = {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.csv$/,
  //         loader: 'csv-loader',
  //         options: {
  //           dynamicTyping: true,
  //           header: true,
  //           skipEmptyLines: true
  //         }
  //       }
  //     ]
  //   }
  // };
  module: {
    rules: [{
      test: /\.(c|d|t)sv$/, // load all .csv, .dsv, .tsv files with dsv-loader
      use: ['dsv-loader'] // or dsv-loader?delimiter=,
    }]
  }};