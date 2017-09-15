<?php foreach($field->entries() as $entry): ?>
   
<?php 

$largeur_bloc = $entry->largeur_bloc();
if($largeur_bloc==1)
   $largeur_bloc='un';
elseif($largeur_bloc==2)
   $largeur_bloc='deux';
elseif($largeur_bloc==3)
   $largeur_bloc='trois';
elseif($largeur_bloc==4)
   $largeur_bloc='quatre';
elseif($largeur_bloc==5)
   $largeur_bloc='cinq';
elseif($largeur_bloc==6)
   $largeur_bloc='six';

$dec_haut = $entry->dec_haut();
$dec_haut = round($dec_haut);
if($dec_haut==100)
   $dec_haut='mt-100';
elseif($dec_haut==200)
   $dec_haut='mt-200';
elseif($dec_haut==300)
   $dec_haut='mt-300';
elseif($dec_haut==400)
   $dec_haut='mt-400';

$largeur_image = $entry->largeur_image();
if($largeur_image==1)
   $largeur_image='img-25';
elseif($largeur_image==2)
   $largeur_image='img-50';
elseif($largeur_image==3)
   $largeur_image='img-75';
elseif($largeur_image==4)
   $largeur_image='img-100';

$dec_gauche = $entry->dec_gauche();
if($dec_gauche==0)
   $dec_gauche='img-dec-0';
elseif($dec_gauche==1)
   $dec_gauche='img-dec-25';
elseif($dec_gauche==2)
   $dec_gauche='img-dec-50';
elseif($dec_gauche==3)
   $dec_gauche='img-dec-75';


?>
   
   
    <div class="structure-entry <?php echo $largeur_bloc ?> <?php echo e($entry->nouvelle_ligne() == 'true', 'new-line', '') ?>" id="structure-entry-<?php echo $entry->id() ?>">
      <div class="structure-entry-content <?php echo $dec_haut ?> <?php echo $largeur_image ?> <?php echo $dec_gauche ?> text">
        <?php echo $field->entry($entry) ?>
      </div>
      <?php if(!$field->readonly()): ?>
      <nav class="structure-entry-options cf">
        <a data-modal class="btn btn-with-icon structure-edit-button" href="<?php __($field->url($entry->id() . '/update')) ?>">
          <?php i('pencil', 'left') ?>
        </a>

        <a data-modal class="btn btn-with-icon structure-delete-button" href="<?php __($field->url($entry->id() . '/delete')) ?>">
          <?php i('trash-o', 'left') ?>
        </a>
      </nav>
      <?php endif ?>
    </div>  
            
<?php endforeach ?>