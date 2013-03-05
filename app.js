(function() {

  return {
    notified: false,

    events: {
      'comment.text.changed': 'textChanged',
      'click a.dismiss'     : 'termNotFound'
    },

    textChanged: function(){
      if (_.isEmpty(this.terms()))
        return;

      if (this.text().search(this.termsRegExp()) > 0){
        this.termFound();
      } else {
        this.termNotFound();
      }
    },

    termFound: function(){
      if(!this.notified){
        services.notify(this.I18n.t('alert.notification'), "alert");
        this.notified = true;
      }

      this.disableSave();

      this.switchTo('alert');
    },

    termNotFound: function(){
      this.notified = false;

      this.enableSave();
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
