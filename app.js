(function() {

  return {
    notified: false,

    events: {
      'comment.text.changed': 'textChanged',
      'click a.dismiss'     : 'dismiss'
    },

    textChanged: _.debounce(function(){
      if (_.isEmpty(this.terms()) || this.notified)
        return;

      if (this.text().search(this.termsRegExp()) >= 0)
        return this.termFound();
    }, 500),

    termFound: function(){
      services.notify(this.I18n.t('alert.notification'), "alert");

      services.appsTray().show();

      this.disableSave();

      this.switchTo('alert');

      this.notified = true;
    },

    dismiss: function(){
      this.enableSave();

      this.switchTo('empty');
    },

    terms: _.memoize(function(){
      return _.compact((this.setting('terms') || "")
                                .split(','));
    }),

    termsRegExp: _.memoize(function(){
      return new RegExp(this.terms().join('|'));
    }),

    text: function(){
      return this.comment().text();
    }
  };

}());
