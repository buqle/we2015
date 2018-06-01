<?php
/**
 * Created by PhpStorm.
 * User: forest
 * Date: 2016/5/10
 * Time: 11:35
 */
use Phalcon\Mvc\Model;
class Category extends Model {
    public function getSource() {
        return 'rhd_category';
    }
}