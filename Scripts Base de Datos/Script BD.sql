-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`modo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`modo_pago` (
  `mod_id` INT(11) NOT NULL AUTO_INCREMENT,
  `mod_nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mod_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`persona_natural`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persona_natural` (
  `pe_nat_id` INT(11) NOT NULL AUTO_INCREMENT,
  `pe_nat_nombres` VARCHAR(30) NOT NULL,
  `pe_nat_apellidos` VARCHAR(30) NOT NULL,
  `pe_nat_dni` VARCHAR(10) NOT NULL,
  `pe_nat_direccion` VARCHAR(70) NOT NULL,
  `pe_nat_email` VARCHAR(45) CHARACTER SET 'big5' NULL DEFAULT NULL,
  PRIMARY KEY (`pe_nat_id`),
  UNIQUE INDEX `pe_nat_id_UNIQUE` (`pe_nat_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_nat_dni_UNIQUE` (`pe_nat_dni` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`boleta` (
  `bol_id` INT(11) NOT NULL AUTO_INCREMENT,
  `bol_fecha` DATE NOT NULL,
  `bol_mtotal` DECIMAL(10,2) NOT NULL,
  `bol_tipo_moneda` VARCHAR(45) NOT NULL,
  `pe_nat_id` INT(11) NULL DEFAULT NULL,
  `mod_id` INT(11) NOT NULL,
  PRIMARY KEY (`bol_id`),
  INDEX `fk_boleta_persona_natural1_idx` (`pe_nat_id` ASC) VISIBLE,
  INDEX `fk_boleta_modo_pago1_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `bol_mod_id`
    FOREIGN KEY (`mod_id`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`),
  CONSTRAINT `bol_pe_nat_id`
    FOREIGN KEY (`pe_nat_id`)
    REFERENCES `mydb`.`persona_natural` (`pe_nat_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `cat_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cat_tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`unidad_medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`unidad_medida` (
  `umed_id` INT(11) NOT NULL AUTO_INCREMENT,
  `umed_nombre` VARCHAR(20) NOT NULL DEFAULT 'UNIDAD',
  PRIMARY KEY (`umed_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`producto` (
  `pro_id` INT(11) NOT NULL AUTO_INCREMENT,
  `pro_nombre` VARCHAR(45) NOT NULL,
  `pro_precio` DECIMAL(10,2) NOT NULL,
  `pro_stock` INT(11) NOT NULL DEFAULT '0',
  `cat_id` INT(11) NOT NULL,
  `umed_id` INT(11) NOT NULL,
  PRIMARY KEY (`pro_id`),
  INDEX `fk_producto_categoria1_idx` (`cat_id` ASC) VISIBLE,
  INDEX `fk_producto_unidad_medida1_idx` (`umed_id` ASC) VISIBLE,
  CONSTRAINT `pro_cat_id`
    FOREIGN KEY (`cat_id`)
    REFERENCES `mydb`.`categoria` (`cat_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `umed_id`
    FOREIGN KEY (`umed_id`)
    REFERENCES `mydb`.`unidad_medida` (`umed_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`detalle_boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`detalle_boleta` (
  `bol_id` INT(11) NOT NULL,
  `pro_id` INT(11) NOT NULL,
  `detb_monto` DECIMAL(10,2) NOT NULL,
  `detb_cantidad` INT(11) NOT NULL,
  PRIMARY KEY (`bol_id`, `pro_id`),
  INDEX `fk_boleta_has_producto_producto1_idx` (`pro_id` ASC) VISIBLE,
  INDEX `fk_boleta_has_producto_boleta1_idx` (`bol_id` ASC) VISIBLE,
  CONSTRAINT `detb_bol_id`
    FOREIGN KEY (`bol_id`)
    REFERENCES `mydb`.`boleta` (`bol_id`),
  CONSTRAINT `detb_pro_id`
    FOREIGN KEY (`pro_id`)
    REFERENCES `mydb`.`producto` (`pro_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`persona_juridica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persona_juridica` (
  `pe_jur_id` INT(11) NOT NULL AUTO_INCREMENT,
  `pe_jur_razon_social` VARCHAR(50) NOT NULL,
  `pe_jur_ruc` VARCHAR(11) NOT NULL,
  `pe_jur_direccion` VARCHAR(65) NOT NULL,
  `pe_jur_email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`pe_jur_id`),
  UNIQUE INDEX `pe_jur_id_UNIQUE` (`pe_jur_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_jur_ruc_UNIQUE` (`pe_jur_ruc` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`factura` (
  `fac_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fac_fecha` DATE NOT NULL,
  `fac_mtotal` DECIMAL(10,2) NOT NULL,
  `fac_tipo_moneda` VARCHAR(45) NOT NULL,
  `pe_jur_id` INT(11) NULL DEFAULT NULL,
  `mod_id` INT(11) NOT NULL,
  PRIMARY KEY (`fac_id`),
  INDEX `fk_factura_persona_juridica1_idx` (`pe_jur_id` ASC) VISIBLE,
  INDEX `fk_factura_modo_pago1_idx` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `fac_mod_id`
    FOREIGN KEY (`mod_id`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`),
  CONSTRAINT `fac_pe_jur_id`
    FOREIGN KEY (`pe_jur_id`)
    REFERENCES `mydb`.`persona_juridica` (`pe_jur_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`detalle_factura` (
  `fac_id` INT(11) NOT NULL,
  `pro_id` INT(11) NOT NULL,
  `detf_monto` DECIMAL(10,2) NOT NULL,
  `detf_cantidad` INT(11) NOT NULL,
  PRIMARY KEY (`fac_id`, `pro_id`),
  INDEX `fk_factura_has_producto_producto1_idx` (`pro_id` ASC) VISIBLE,
  INDEX `fk_factura_has_producto_factura1_idx` (`fac_id` ASC) VISIBLE,
  CONSTRAINT `detf_fac_id`
    FOREIGN KEY (`fac_id`)
    REFERENCES `mydb`.`factura` (`fac_id`),
  CONSTRAINT `detf_pro_id`
    FOREIGN KEY (`pro_id`)
    REFERENCES `mydb`.`producto` (`pro_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
