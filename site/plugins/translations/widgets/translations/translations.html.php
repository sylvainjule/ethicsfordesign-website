<style type="text/css">
  @media screen and (min-width: 640px) {
    #translations-widget {
      min-height: 400px;
    }
  }
</style>

<?php if ($items->count()): ?>

  <ul class="nav nav-list sidebar-list">
    <?php foreach ($items as $item): ?>
      <?php #<?php # panel/app/snippets/pages/sidebar/subpage.php ?>
      <li>
        <a class="draggable<?php e($item->isInvisible(), ' invisible'); ?>" data-helper="<?php __($item->title(), 'attr') ?>" data-text="<?php __($item->dragText()) ?>" href="<?php __($item->url('edit')) ?>">
          <?php echo $item->icon() ?><span><?php __($item->title()) ?></span>
          <small class="marginalia shiv shiv-left shiv-white"><?php __($item->uri()) ?></small>
        </a>
        <a class="option" data-context="<?php __($item->url('context')) ?>" href="#options"><?php i('ellipsis-h') ?></a>
      </li>
    <?php endforeach; ?>
  </ul>

  <?php # panel/app/snippets/pagination.php ?>
  <?php if($items->pagination()->hasPages()): ?>
    <nav class="pagination">
      <a class="pagination-prev<?php e(!$items->pagination()->hasPrevPage(), ' pagination-inactive') ?>" href="<?php echo $items->pagination()->prevPageURL() ?>"><?php i('chevron-left') ?></a>
      <span class="pagination-index">
        <?php echo $items->pagination()->page() . ' / ' . $items->pagination()->pages() ?>
        <select onchange="app.content.open(this.value)">
          <?php foreach(range(1, $items->pagination()->pages()) as $p): ?>
          <option value="<?php echo $items->pagination()->pageUrl($p) ?>"<?php e($p == $items->pagination()->page(), ' selected') ?>><?php echo $p ?></option>
          <?php endforeach ?>
        </select>
      </span>
      <a class="pagination-next<?php e(!$items->pagination()->hasNextPage(), ' pagination-inactive') ?>" href="<?php echo $items->pagination()->nextPageURL() ?>"><?php i('chevron-right') ?></a>
    </nav>
  <?php endif ?>

<?php else: ?>

  <div class="text">
    <?php echo l::get('translations.widget.noresults', 'Yay! No missing translations for this language.') ?>
    <?php #_l('dashboard.index.history.text') ?>
  </div>

<?php endif; ?>
