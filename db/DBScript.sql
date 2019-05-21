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
-- Table `mydb`.`persona_natural`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persona_natural` (
  `pe_nat_id` INT NOT NULL,
  `pe_nat_nombres` VARCHAR(30) NULL,
  `pe_nat_apellidos` VARCHAR(30) NULL,
  `pe_nat_dni` VARCHAR(10) NULL,
  `pe_nat_direccion` VARCHAR(70) NULL,
  `pe_nat_email` VARCHAR(45) CHARACTER SET 'big5' NULL,
  PRIMARY KEY (`pe_nat_id`),
  UNIQUE INDEX `pe_nat_id_UNIQUE` (`pe_nat_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_nat_dni_UNIQUE` (`pe_nat_dni` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`persona_juridica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persona_juridica` (
  `pe_jur_id` INT NOT NULL AUTO_INCREMENT,
  `pe_jur_razon_social` VARCHAR(50) NULL,
  `pe_jur_ruc` VARCHAR(11) NULL,
  `pe_jur_email` VARCHAR(45) NULL,
  `pe_jur_direccion` VARCHAR(65) NULL,
  PRIMARY KEY (`pe_jur_id`),
  UNIQUE INDEX `pe_jur_id_UNIQUE` (`pe_jur_id` ASC) VISIBLE,
  UNIQUE INDEX `pe_jur_ruc_UNIQUE` (`pe_jur_ruc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`modo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`modo_pago` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`mod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`factura` (
  `fac_id` INT NOT NULL AUTO_INCREMENT,
  `fac_fecha` DATE NULL,
  `fac_mtotal` DECIMAL(10) NULL,
  `fac_tipo_moneda` VARCHAR(45) NULL,
  `per_id_f` INT NULL,
  `mod_id_f` INT NULL,
  PRIMARY KEY (`fac_id`),
  INDEX `per_nat_id_idx` (`per_id_f` ASC) VISIBLE,
  INDEX `mod_id_f_idx` (`mod_id_f` ASC) VISIBLE,
  CONSTRAINT `mod_id_f`
    FOREIGN KEY (`mod_id_f`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `per_id_f`
    FOREIGN KEY (`per_id_f`)
    REFERENCES `mydb`.`persona_natural` (`pe_nat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pe_jur_id`
    FOREIGN KEY (`per_id_f`)
    REFERENCES `mydb`.`persona_juridica` (`pe_jur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`boleta` (
  `bol_id` INT NOT NULL,
  `bol_fecha` DATE NULL,
  `bol_mtotal` DECIMAL(11) NULL,
  `per_id_b` INT NULL,
  `mod_id_b` INT NULL,
  `bol_tipo_moneda` VARCHAR(45) NULL,
  PRIMARY KEY (`bol_id`),
  UNIQUE INDEX `bol_id_UNIQUE` (`bol_id` ASC) VISIBLE,
  INDEX `pe_nat_id_idx` (`per_id_b` ASC) VISIBLE,
  INDEX `mod_id_idx` (`mod_id_b` ASC) VISIBLE,
  CONSTRAINT `mod_id_b`
    FOREIGN KEY (`mod_id_b`)
    REFERENCES `mydb`.`modo_pago` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `per_id_b`
    FOREIGN KEY (`per_id_b`)
    REFERENCES `mydb`.`persona_natural` (`pe_nat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT ``
    FOREIGN KEY (`per_id_b`)
    REFERENCES `mydb`.`persona_juridica` (`pe_jur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `cat_tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`producto` (
  `pro_id` INT NOT NULL,
  `pro_nombre` VARCHAR(45) NULL,
  `pro_precio` DECIMAL(10) NULL,
  `pro_stock` INT NULL DEFAULT 0,
  `pro_umed` VARCHAR(45) NULL,
  `cat_id` INT NULL,
  PRIMARY KEY (`pro_id`),
  INDEX `cat_id_idx` (`cat_id` ASC) VISIBLE,
  CONSTRAINT `cat_id`
    FOREIGN KEY (`cat_id`)
    REFERENCES `mydb`.`categoria` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`detalle_factura` (
  `detf_id` INT NOT NULL,
  `detf_precio` DECIMAL(10) NULL,
  `detf_cantidad` INT NULL,
  `pro_id_f` INT NULL,
  `fac_id` INT NULL,
  PRIMARY KEY (`detf_id`),
  INDEX `fac_id_idx` (`fac_id` ASC) VISIBLE,
  INDEX `pro_id_idx` (`pro_id_f` ASC) VISIBLE,
  CONSTRAINT `fac_id`
    FOREIGN KEY (`fac_id`)
    REFERENCES `mydb`.`factura` (`fac_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pro_id_f`
    FOREIGN KEY (`pro_id_f`)
    REFERENCES `mydb`.`producto` (`pro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`detalle_boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`detalle_boleta` (
  `detb_id` INT NOT NULL,
  `detb_precio` DECIMAL(10) NULL,
  `detb_cantidad` INT NULL,
  `bol_id` INT NULL,
  `pro_id_b` INT NULL,
  PRIMARY KEY (`detb_id`),
  INDEX `bol_id_idx` (`bol_id` ASC) VISIBLE,
  INDEX `pro_id_idx` (`pro_id_b` ASC) VISIBLE,
  CONSTRAINT `bol_id`
    FOREIGN KEY (`bol_id`)
    REFERENCES `mydb`.`boleta` (`bol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pro_id_b`
    FOREIGN KEY (`pro_id_b`)
    REFERENCES `mydb`.`producto` (`pro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
