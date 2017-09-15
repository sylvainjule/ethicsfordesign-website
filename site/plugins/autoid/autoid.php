<?php
/**
 *
 * AutoID Plugin for Kirby 2
 *
 * @version   1.0.2
 * @author    Helllicht medien GmbH <http://helllicht.com>
 * @copyright Helllicht medien GmbH <http://helllicht.com>
 * @link      https://github.com/helllicht/kirby-autoid
 * @license   MIT <http://opensource.org/licenses/MIT>
 */

class AutoIdPlugin {
    /**
     * @var string
     */
    protected $fieldName;

    /**
     * @var string id or hash
     */
    protected $fieldType;

    public function __construct($fieldName, $fieldType) {
        $this->fieldName = $fieldName;
        $this->fieldType = $fieldType;
    }

    public function onPageCreate($page) {
        if ($this->fieldExists($page)) {
            $page->update(array(
                $this->fieldName => $this->getUniqueAutoId()
            ));
        }
    }

    public function onPageUpdate($page) {
        if (
            $this->fieldExists($page) &&
            $page->{$this->fieldName}()->isEmpty()
        ) {
            $page->update(array(
                $this->fieldName => $this->getUniqueAutoId()
            ));
        }
    }

    /**
     * @return string
     */
    protected function getNewAutoId($offset = 0) {
        if ($this->fieldType === 'hash') {
            // Get Elements
            $elements[] = microtime();
            $elements[] = session_id();
            $elements[] = $offset;

            // Concatenate Elements
            $idString = implode('', $elements);

            // Build Hash
            $idHash = md5($idString);

            return $idHash;

        } else { // defaults to id

            // get latest ID, numbers only!
            $fieldName = $this->fieldName;
            $filteredPages = site()->pages()->index()->filter(function($p) use ($fieldName) {
                $val = $p->{$fieldName}()->value();

                return is_numeric($val);
            })->sortBy($fieldName, 'desc');

            if ($filteredPages->count() == 0) {
                $nextId = 1 + $offset;
            } else {
                $latestId = intval($filteredPages->first()->{$this->fieldName}()->value());
                $nextId = $latestId + 1 + $offset;
            }

            return (string) $nextId;
        }
    }

    /**
     * @return string
     */
    protected function getUniqueAutoId() {
        for ($offset = 0; $offset <= 10; $offset++) {
            // Get new Id
            $autoid = $this->getNewAutoId($offset);

            // Check if id is existing
            $existingId = site()->pages()->index()->filterBy($this->fieldName, $autoid)->count();

            // Return unique id
            if ($existingId == 0) {
                return $autoid;
            }

            // Try again
        }

        throw new Exception('Fatal Error: Cannot create new id. Tried 10 offsets with no luck.');
    }

    /**
     * @return bool
     */
    protected function fieldExists($page) {
        // KIRBY is missing an $page->field()->exists() method
        $contentArray = $page->content()->toArray();

        // Check if field isset
        return isset($contentArray[$this->fieldName]);
    }
}

// Allow to overwrite field name in config.php with c::set('autoid.name', 'NameMyField');
$fieldName = c::get('autoid.name', 'autoid');

// Allow to overwrite field type to 'hash' instead of 'id' with c::set('autoid.type', 'hash');
$fieldType = c::get('autoid.type', 'id');

// create a instance and hook into kirby
$plugin = new AutoIdPlugin($fieldName, $fieldType);

// Set id for new pages
kirby()->hook('panel.page.create', function($page) use ($plugin) {
    return $plugin->onPageCreate($page);
});

// Set id for existing pages (if added later)
kirby()->hook('panel.page.update', function($page) use ($plugin) {
    // trigger update only with version 2.2.2 or higher
    $version = intval(str_replace('.', '', panel()->version()));
    if($version >= 222) {
        return $plugin->onPageUpdate($page);
    } else {
        // do nothing, because of a kirby bug: https://github.com/getkirby/panel/issues/667
    }
});