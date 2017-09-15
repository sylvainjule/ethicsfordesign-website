<?php

class QuickselectField extends SelectField {
	static public $fieldname = 'quickselect';
	static public $assets = array(
    'js' => array(
      'select2.js',
      'select.js'
    ),
    'css' => array(
      'select2.css',
      'select.css'
    )
  );

	public function input() {
		$select = new Brick('select');
		$select->addClass('selectbox quickselect');
		$select->attr(array(
			'name'         => $this->name(),
			'id'           => $this->id(),
			'required'     => $this->required(),
			'autocomplete' => $this->autocomplete(),
			'autofocus'    => $this->autofocus(),
			'readonly'     => $this->readonly(),
			'disabled'     => $this->disabled(),
			'data-placeholder'  => $this->placeholder(),
		));
		$default = $this->default();
		if(!$this->required()) {
			$select->append($this->option('', '', $this->value() == ''));
		}
		if($this->readonly()) {
			$select->attr('tabindex', '-1');
		}

		foreach($this->options() as $value => $text) {
		  
		  if(strpos($value, ".jpg")  !== false OR
		     strpos($value, ".jpeg") !== false OR
		     strpos($value, ".gif")  !== false OR
		     strpos($value, ".png")  !== false) {
	       if (!strpos(implode(",", $select->attr("class")), "images")  !== false) {
           $select->addClass("images");
         }
         
         if($image = $this->page()->image($value)) {
           $image = $image->crop(75, 75)->url();
           $select->append(
             $this->option($value, $text, $this->value() == $value)->attr("data-image", $image)
           );   
         }
         else {
            $select->append(
              $this->option($value, $text, $this->value() == $value)
            );
         }
 
		  }
		  else {
        
        $select->append(
          $this->option($value, $text, $this->value() == $value)
        );
        
      }
			
		}
		
		$noresults = $this->i18n([
      'en'    => "Nothing found",
      'de'    => "Nichts gefunden"
    ]);
    

		$select->attr("data-noresults", $noresults);
		$select->attr("style", "width: 100%");
		$inner = new Brick('div');
		$inner->addClass('selectbox-wrapper quickselect-wrapper');
		$inner->append($select);
		$x = new Brick('i');
		$x->addClass('icon fa fa-times-circle x');
		$inner->append($x);
		$wrapper = new Brick('div');
		$wrapper->addClass('input input-with-selectbox input-with-quickselect');
		$wrapper->append($inner);
		if($this->readonly()) {
			$wrapper->addClass('input-is-readonly');
		} else {
			$wrapper->attr('data-focus', 'true');
		}
		return $wrapper;
	}

	public function element() {
		$element = parent::element();
		$element->data('field', 'quickselect');
		return $element;
	}

	public function val() {
		if($this->value() == "" && $this->default() !== "") {
			$value = $this->default();
		} elseif($this->value() == "" && $this->default() == "") {
			$value = "";
		} else {
			$value = $this->value();
		}
		return $value;
	}
}
