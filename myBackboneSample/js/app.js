
(function(){
   var Enemy = Backbone.Model.extend({
	defaults: {
	    name: 'name',
	    target: 0,
	}
    });
    
    var Enemies = Backbone.Collection.extend({
	model: Enemy,
    });
    
    var EnemyView = Backbone.View.extend({
	tagName: 'li',
	initialize: function(){
	    this.model.on('change', this.render, this);	    //change: => modelが変わった事を示すイベント,予約語
	},
	events: {
	    'click .tage': 'toggle',
	},
	toggle: function(){
	    this.model.set('target', !this.model.get('target'));
	    enemies.sort();
	},
	template: _.template($('#enemy-template').html()),
	render: function(){	    
	    var template = this.template(this.model.toJSON());
	    this.$el.html(template);	    
	    return this;
	}
    });

    var EnemiesView = Backbone.View.extend({	
	tagName: 'ul',
	initialize: function(){
	    this.collection.on('sort', this.sorting, this);
	},
	sorting : function(){
	    enemiesView = new EnemiesView({collection: this.collection});
	    $('#enemies').html(enemiesView.render().el);
	},
	render: function(){
	    this.collection.each(function(enemy){
		var enemyView = new EnemyView({model: enemy});
		console.log(this.$el);
		this.$el.append(enemyView.render().el);		
		return this;
	    }, this );
	    return this;
	}
    });
    
    var enemies = new Enemies([
	{	    
	    name: 'dantyo',
	   target: 1
	},
    	{
	    name: 'fukudantyo'
	},
    	{
	    name: 'hira'
	}
    ]);

    enemies.comparator = function(model){
	return -model.get("target");
    }
    
    var enemiesView = new EnemiesView({collection: enemies});
    $('#enemies').html(enemiesView.render().el);
})();


