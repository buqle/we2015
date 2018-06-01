<?php
/**
 * Created by PhpStorm.
 * User: forest
 * Date: 2016/5/10
 * Time: 11:35
 */
use Phalcon\Mvc\Model;
class Articles extends Model {
    public function getSource() {
        return 'rhd_articles';
    }
    public function initialize() {
        $this->hasOne('second_category_id', 'Category','id');
    }
    //创建开始时间
    public function beforeValidation()
    {
        $pras = explode('-', $this->first_category_id);
        $this->first_category_id = $pras[0];
        $this->second_category_id = $pras[1];
        $this->content = htmlspecialchars($this->content);
    }
    public function beforeCreate() {
        $this->add_time = time();
        $this->click_total = 0;
    }
    public function getContent() {
        return html_entity_decode($this->content);
    }
    public function getAddTime() {
        return date('Y-m-d h:i:s',$this->add_time);
    }

}