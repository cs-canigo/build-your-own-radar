require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');

const GoogleSheetInput = require('./util/factory');

GoogleSheetInput().build();