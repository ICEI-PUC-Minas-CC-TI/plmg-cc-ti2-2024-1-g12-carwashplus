-- MySQL Script generated by MySQL Workbench
-- Fri Apr  5 20:11:03 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `Avaliacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Avaliacao` ;

CREATE TABLE IF NOT EXISTS `Avaliacao` (
  `idAvaliacao` INT NOT NULL,
  `Comentario` MEDIUMTEXT NULL,
  `Numero de Estrelas` INT NOT NULL,
  `Empresa_CNPJ` INT NOT NULL,
  `Usuario_CPF` INT NOT NULL,
  PRIMARY KEY (`idAvaliacao`),
  CONSTRAINT `fk_Avaliação_Empresa1`
    FOREIGN KEY (`Empresa_CNPJ`)
    REFERENCES `Empresa` (`CNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliacao_Usuario1`
    FOREIGN KEY (`Usuario_CPF`)
    REFERENCES `Usuario` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Avaliação_Empresa1_idx` ON `Avaliacao` (`Empresa_CNPJ` ASC) VISIBLE;

CREATE INDEX `fk_Avaliacao_Usuario1_idx` ON `Avaliacao` (`Usuario_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Carro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Carro` ;

CREATE TABLE IF NOT EXISTS `Carro` (
  `Placa` VARCHAR(8) NOT NULL,
  `Modelo` VARCHAR(50) NOT NULL,
  `Marca` VARCHAR(50) NOT NULL,
  `Cor` VARCHAR(50) NOT NULL,
  `Usuario_CPF` INT NOT NULL,
  PRIMARY KEY (`Placa`),
  CONSTRAINT `fk_Carro_Usuário`
    FOREIGN KEY (`Usuario_CPF`)
    REFERENCES `Usuario` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Carro_Usuário_idx` ON `Carro` (`Usuario_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Empresa` ;

CREATE TABLE IF NOT EXISTS `Empresa` (
  `CNPJ` INT NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Telefone` INT NOT NULL,
  PRIMARY KEY (`CNPJ`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Funcionario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Funcionario` ;

CREATE TABLE IF NOT EXISTS `Funcionario` (
  `CPF` INT NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Sobrenome` VARCHAR(50) NOT NULL,
  `Cargo` VARCHAR(50) NOT NULL,
  `Empresa_CNPJ` INT NOT NULL,
  PRIMARY KEY (`CPF`),
  CONSTRAINT `fk_Funcionário_Empresa1`
    FOREIGN KEY (`Empresa_CNPJ`)
    REFERENCES `Empresa` (`CNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Funcionário_Empresa1_idx` ON `Funcionario` (`Empresa_CNPJ` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Pagamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Pagamento` ;

CREATE TABLE IF NOT EXISTS `Pagamento` (
  `idPagamento` INT NOT NULL,
  `Forma de Pagamento` VARCHAR(50) NOT NULL,
  `Nome do Titular` VARCHAR(100) NULL,
  `Validade` DATE NULL,
  `Codigo de Segurança` INT NULL,
  `Numero do Cartao` INT NULL,
  `Usuario_CPF` INT NOT NULL,
  PRIMARY KEY (`idPagamento`),
  CONSTRAINT `fk_Pagamento_Usuário1`
    FOREIGN KEY (`Usuario_CPF`)
    REFERENCES `Usuario` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Pagamento_Usuário1_idx` ON `Pagamento` (`Usuario_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Serviço`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Serviço` ;

CREATE TABLE IF NOT EXISTS `Serviço` (
  `Usuario_CPF` INT NOT NULL,
  `Empresa_CNPJ` INT NOT NULL,
  `Tipo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`Usuario_CPF`, `Empresa_CNPJ`),
  CONSTRAINT `fk_Usuário_has_Empresa_Usuário1`
    FOREIGN KEY (`Usuario_CPF`)
    REFERENCES `Usuario` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuário_has_Empresa_Empresa1`
    FOREIGN KEY (`Empresa_CNPJ`)
    REFERENCES `Empresa` (`CNPJ`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Usuário_has_Empresa_Empresa1_idx` ON `Serviço` (`Empresa_CNPJ` ASC) VISIBLE;

CREATE INDEX `fk_Usuário_has_Empresa_Usuário1_idx` ON `Serviço` (`Usuario_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

CREATE TABLE IF NOT EXISTS `Usuario` (
  `CPF` INT NOT NULL,
  `Primeiro Nome` VARCHAR(50) NOT NULL,
  `Sobrenome` VARCHAR(50) NOT NULL,
  `Senha` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Telefone` INT NOT NULL,
  PRIMARY KEY (`CPF`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
